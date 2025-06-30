import { randomBytes, createHash } from 'crypto';

// Generate CSRF token
export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex');
}

// Verify CSRF token
export function verifyCSRFToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) {
    return false;
  }
  
  // Simple token comparison (in production, use more sophisticated method)
  return token === sessionToken;
}

// Create token hash for storage
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

// Middleware to check CSRF token in API routes
export function validateCSRF(requestToken: string, expectedToken: string): boolean {
  if (!requestToken || !expectedToken) {
    return false;
  }
  
  return requestToken === expectedToken;
} 