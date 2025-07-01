import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureDbConnection } from "@/lib/prisma";
import { createApiHandler } from "@/lib/auth-middleware";
import { paginationSchema } from "@/lib/validations";

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

    // Fetch plans
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
      }),
      prisma.plan.count({ where: whereClause }),
    ]);

    // Transform features from JSON string to array
    const transformedPlans = plans.map(plan => ({
      ...plan,
      features: JSON.parse(plan.features),
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
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

// Export handler with middleware
export const GET = createApiHandler(getHandler, {
  rateLimit: { maxRequests: 100, windowMs: 60000 }, // 100 requests per minute
}); 