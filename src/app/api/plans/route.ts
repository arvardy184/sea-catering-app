import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureDbConnection } from "@/lib/prisma";
import { createApiHandler } from "@/lib/auth-middleware";
import { paginationSchema } from "@/lib/validations";

// Safe JSON parser to handle potential UTF-8 issues
function safeJsonParse(jsonString: string, fallback: unknown[] = []) {
  try {
    // Remove any null bytes or invalid UTF-8 characters
    const cleanedString = jsonString.replace(/\0/g, '').replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, '');
    return JSON.parse(cleanedString);
  } catch (error) {
    console.warn('Failed to parse JSON features:', error);
    return fallback;
  }
}

// GET - Fetch active plans for subscription selection
const getHandler = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await ensureDbConnection();
    
    const { searchParams } = new URL(req.url);
    
    // Parse pagination parameters with better defaults handling
    const paginationResult = paginationSchema.safeParse({
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '10',
      search: searchParams.get('search') || undefined,
      sortBy: searchParams.get('sortBy') || 'sortOrder',
      sortOrder: searchParams.get('sortOrder') || 'asc',
    });

    if (!paginationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid pagination parameters',
          details: paginationResult.error.errors
        },
        { status: 400 }
      );
    }

    const { page, limit, search, sortBy, sortOrder } = paginationResult.data;
    const skip = (page - 1) * limit;

    // Build where clause
    const whereClause: Record<string, unknown> = {
      isActive: true,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ]
      })
    };

    // Build order by clause
    const orderBy: Record<string, 'asc' | 'desc'> = { [sortBy as string]: sortOrder };

    // Fetch plans with explicit error handling
    const [plans, total] = await Promise.all([
      prisma.plan.findMany({
        where: whereClause,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          basePrice: true,
          features: true,
          color: true,
          sortOrder: true,
        },
      }).catch((error) => {
        console.error('Error fetching plans:', error);
        // Return empty array on DB error to prevent complete failure
        return [];
      }),
      prisma.plan.count({ where: whereClause }).catch(() => 0),
    ]);

    // Transform features from JSON string to array with safe parsing
    const transformedPlans = plans.map(plan => ({
      ...plan,
      features: safeJsonParse(plan.features),
    }));

    return NextResponse.json({
      success: true,
      message: 'Plans fetched successfully',
      data: transformedPlans,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error("Error fetching plans:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: process.env.NODE_ENV === 'development' ? error : undefined 
      },
      { status: 500 }
    );
  }
};

// Export handler with middleware
export const GET = createApiHandler(getHandler, {
  rateLimit: { maxRequests: 100, windowMs: 60000 }, // 100 requests per minute
}); 