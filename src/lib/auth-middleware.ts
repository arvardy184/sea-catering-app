import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Types for middleware
export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    name?: string;
    role: 'USER' | 'ADMIN';
  };
}

export interface MiddlewareConfig {
  requireAuth?: boolean;
  requireAdmin?: boolean;
  allowSelf?: boolean; // Allow user to access their own data
}

// Helper function to get session from request
export async function getSessionFromRequest(): Promise<{
  user?: {
    id: string;
    email: string;
    name?: string;
    role: 'USER' | 'ADMIN';
  };
} | null> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return null;
    }

    // Get full user data from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name || undefined,
        role: user.role,
      },
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

// Main authentication middleware
export function withAuth(
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>,
  config: MiddlewareConfig = {}
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      const sessionData = await getSessionFromRequest();
      
      // Check if authentication is required
      if (config.requireAuth && !sessionData?.user) {
        return NextResponse.json(
          { 
            error: 'Authentication required',
            code: 'AUTH_REQUIRED'
          },
          { status: 401 }
        );
      }

      // Check if admin role is required
      if (config.requireAdmin && sessionData?.user?.role !== 'ADMIN') {
        return NextResponse.json(
          { 
            error: 'Admin access required',
            code: 'ADMIN_REQUIRED'
          },
          { status: 403 }
        );
      }

      // Attach user to request
      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = sessionData?.user;

      // Call the actual handler
      return await handler(authenticatedReq);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { 
          error: 'Internal server error',
          code: 'INTERNAL_ERROR'
        },
        { status: 500 }
      );
    }
  };
}

// Helper function to check if user can access resource
export function canAccessResource(
  currentUser: { id: string; role: 'USER' | 'ADMIN' },
  resourceUserId?: string,
  allowSelf: boolean = true
): boolean {
  // Admin can access everything
  if (currentUser.role === 'ADMIN') {
    return true;
  }

  // If allowSelf is true and resourceUserId matches current user
  if (allowSelf && resourceUserId && currentUser.id === resourceUserId) {
    return true;
  }

  return false;
}

// Specialized middleware for user resources
export function withUserAuth(
  handler: (req: AuthenticatedRequest, userId: string) => Promise<NextResponse>,
  config: Omit<MiddlewareConfig, 'allowSelf'> & { allowSelf?: boolean } = { allowSelf: true }
) {
  return withAuth(async (req: AuthenticatedRequest) => {
    const url = new URL(req.url);
    const userId = url.pathname.split('/').pop(); // Get last segment as userId
    
    if (!userId) {
      return NextResponse.json(
        { 
          error: 'User ID is required',
          code: 'USER_ID_REQUIRED'
        },
        { status: 400 }
      );
    }

    // Check if user can access this resource
    if (!canAccessResource(req.user!, userId, config.allowSelf)) {
      return NextResponse.json(
        { 
          error: 'Access denied',
          code: 'ACCESS_DENIED'
        },
        { status: 403 }
      );
    }

    return await handler(req, userId);
  }, { requireAuth: true, ...config });
}

// Rate limiting middleware (basic implementation)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: { maxRequests: number; windowMs: number } = { maxRequests: 100, windowMs: 15 * 60 * 1000 }
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    // Get client IP from x-forwarded-for header since req.ip is not available in NextRequest
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    
    const requestData = requestCounts.get(ip);

    if (!requestData || now > requestData.resetTime) {
      // Reset or initialize
      requestCounts.set(ip, {
        count: 1,
        resetTime: now + options.windowMs,
      });
    } else {
      requestData.count++;
      
      if (requestData.count > options.maxRequests) {
        return NextResponse.json(
          { 
            error: 'Too many requests',
            code: 'RATE_LIMIT_EXCEEDED',
            retryAfter: Math.ceil((requestData.resetTime - now) / 1000)
          },
          { status: 429 }
        );
      }
    }

    return await handler(req);
  };
}

// CSRF protection middleware
export function withCSRF(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    // Skip CSRF for GET requests
    if (req.method === 'GET') {
      return await handler(req);
    }

    try {
      const sessionData = await getSessionFromRequest();
      
      if (!sessionData?.user) {
        // No session, skip CSRF check for public endpoints
        return await handler(req);
      }

      const body = await req.json();
      const csrfToken = body.csrfToken || req.headers.get('x-csrf-token');
      
      if (!csrfToken) {
        return NextResponse.json(
          { 
            error: 'CSRF token is required',
            code: 'CSRF_TOKEN_REQUIRED'
          },
          { status: 403 }
        );
      }

      // In a real app, you'd validate the CSRF token properly
      // For now, we'll just check if it exists
      // TODO: Implement proper CSRF token validation
      
      return await handler(req);
    } catch (error) {
      console.error('CSRF middleware error:', error);
      return NextResponse.json(
        { 
          error: 'Invalid request format',
          code: 'INVALID_REQUEST'
        },
        { status: 400 }
      );
    }
  };
}

// Combined middleware helper
export function createApiHandler(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: {
    auth?: MiddlewareConfig;
    rateLimit?: { maxRequests: number; windowMs: number };
    csrf?: boolean;
  } = {}
) {
  let finalHandler = handler;

  // Apply middlewares in reverse order (last applied = first executed)
  if (options.csrf) {
    finalHandler = withCSRF(finalHandler);
  }

  if (options.rateLimit) {
    finalHandler = withRateLimit(finalHandler, options.rateLimit);
  }

  if (options.auth) {
    finalHandler = withAuth(finalHandler as (req: AuthenticatedRequest) => Promise<NextResponse>, options.auth);
  }

  return finalHandler;
} 