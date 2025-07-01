import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureDbConnection } from "@/lib/prisma";
import { createApiHandler } from "@/lib/auth-middleware";

// GET - Fetch active meal types for subscription selection  
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getHandler = async (_req: NextRequest): Promise<NextResponse> => {
  try {
    await ensureDbConnection();
    
    // Fetch active meal types
    const mealTypes = await prisma.mealType.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        icon: true,
        timeRange: true,
        sortOrder: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Meal types fetched successfully',
      data: mealTypes,
    });

  } catch (error) {
    console.error("Error fetching meal types:", error);
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