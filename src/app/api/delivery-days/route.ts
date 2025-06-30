import { NextResponse } from "next/server";
import { prisma, ensureDbConnection } from "@/lib/prisma";
import { createApiHandler, AuthenticatedRequest } from "@/lib/auth-middleware";

// GET - Fetch active delivery days for subscription selection
// eslint-disable-next-line @typescript-eslint/no-unused-vars  
const getHandler = async (_req: AuthenticatedRequest): Promise<NextResponse> => {
  try {
    await ensureDbConnection();
    
    // Fetch active delivery days
    const deliveryDays = await prisma.deliveryDay.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        dayOfWeek: 'asc', // Order by day of week (0=Sunday, 1=Monday, etc.)
      },
      select: {
        id: true,
        name: true,
        slug: true,
        dayOfWeek: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Delivery days fetched successfully',
      data: deliveryDays,
    });

  } catch (error) {
    console.error("Error fetching delivery days:", error);
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