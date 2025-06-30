import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPhoneNumber(phone: string): string {
  // Format Indonesian phone number
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phone;
}

import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Create a fake DOM environment for server-side DOMPurify
const createDOMPurify = () => {
  if (typeof window !== 'undefined') {
    // Client-side
    return DOMPurify;
  } else {
    // Server-side
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const purify = DOMPurify(dom.window as any);
    return purify;
  }
};

// Security utility functions
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  const purify = createDOMPurify();
  
  // Configure DOMPurify for text input (no HTML allowed)
  return purify.sanitize(input, { 
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true, // Keep text content
    FORBID_TAGS: ['script', 'object', 'embed', 'link', 'style'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
  }).trim();
}

export function sanitizeHtml(html: string): string {
  if (typeof html !== 'string') return '';
  
  const purify = createDOMPurify();
  
  // Configure DOMPurify for safe HTML (limited tags)
  return purify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'i', 'b'],
    ALLOWED_ATTR: [],
    FORBID_TAGS: ['script', 'object', 'embed', 'link', 'style'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
    KEEP_CONTENT: true
  });
}

export function escapeHtml(text: string): string {
  if (typeof text !== 'string') return '';
  
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Additional security helpers
export function removeScriptTags(input: string): string {
  if (typeof input !== 'string') return '';
  
  const purify = createDOMPurify();
  return purify.sanitize(input, {
    FORBID_TAGS: ['script'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'javascript:']
  });
}

export function sanitizeFilename(filename: string): string {
  if (typeof filename !== 'string') return '';
  
  return filename
    .replace(/[<>:"/\\|?*]/g, '') // Remove dangerous characters
    .replace(/\.\./g, '') // Remove parent directory references
    .replace(/^\.+/, '') // Remove leading dots
    .trim()
    .substring(0, 255); // Limit length
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Indonesian phone number validation
  const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password minimal 8 karakter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password harus mengandung huruf besar');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password harus mengandung huruf kecil');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password harus mengandung angka');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password harus mengandung karakter khusus');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
} 