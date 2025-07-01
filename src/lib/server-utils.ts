import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Server-side DOMPurify setup (this file should only be imported on server)
const window = new JSDOM('<!DOCTYPE html><html><body></body></html>').window;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const purify = DOMPurify(window as any);

// Server-side security utility functions
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
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
  
  // Configure DOMPurify for safe HTML (limited tags)
  return purify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'i', 'b'],
    ALLOWED_ATTR: [],
    FORBID_TAGS: ['script', 'object', 'embed', 'link', 'style'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
    KEEP_CONTENT: true
  });
}

export function removeScriptTags(input: string): string {
  if (typeof input !== 'string') return '';
  
  return purify.sanitize(input, {
    FORBID_TAGS: ['script'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'javascript:']
  });
} 