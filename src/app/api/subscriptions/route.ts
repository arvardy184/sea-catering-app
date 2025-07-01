import { NextResponse } from "next/server";
import { prisma, ensureDbConnection } from "@/lib/prisma";
import { sanitizeInput } from "@/lib/server-utils";
import { createSubscriptionSchema, paginationSchema } from "@/lib/validations";
import { createApiHandler, AuthenticatedRequest } from "@/lib/auth-middleware";

// Server-side price calculation
async function calculateSubscriptionPrice(
  planId: string,
  mealTypeIds: string[],
  deliveryDayIds: string[]
): Promise<number> {
  // Get plan base price
  const plan = await prisma.plan.findUnique({
    where: { id: planId, isActive: true },
    select: { basePrice: true }
  });

  if (!plan) {
    throw new Error('Plan tidak ditemukan atau tidak aktif');
  }

  // Calculate total price: Plan Base Price × Meal Types × Delivery Days × 4.3 (weeks in month)
  const totalPrice = plan.basePrice * mealTypeIds.length * deliveryDayIds.length * 4.3;
  
  return Math.round(totalPrice);
}

// Validate meal types and delivery days exist
async function validateSubscriptionData(
  planId: string,
  mealTypeIds: string[],
  deliveryDayIds: string[]
) {
  // Check if plan exists and is active
  const plan = await prisma.plan.findUnique({
    where: { id: planId, isActive: true }
  });
  
  if (!plan) {
    throw new Error('Plan tidak ditemukan atau tidak aktif');
  }

  // Check if all meal types exist and are active
  const mealTypes = await prisma.mealType.findMany({
    where: { 
      id: { in: mealTypeIds },
      isActive: true 
    }
  });
  
  if (mealTypes.length !== mealTypeIds.length) {
    throw new Error('Beberapa jenis makanan tidak ditemukan atau tidak aktif');
  }

  // Check if all delivery days exist and are active
  const deliveryDays = await prisma.deliveryDay.findMany({
    where: { 
      id: { in: deliveryDayIds },
      isActive: true 
    }
  });
  
  if (deliveryDays.length !== deliveryDayIds.length) {
    throw new Error('Beberapa hari pengiriman tidak ditemukan atau tidak aktif');
  }

  return { plan, mealTypes, deliveryDays };
}

// POST - Create subscription with server-side price calculation
const postHandler = async (req: AuthenticatedRequest): Promise<NextResponse> => {
  try {
    await ensureDbConnection();
    
    const body = await req.json();
    
    // Validate input with Zod
    const validationResult = createSubscriptionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    const { name, phone, planId, mealTypeIds, deliveryDayIds, allergies } = validationResult.data;

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedPhone = sanitizeInput(phone);
    const sanitizedAllergies = allergies ? sanitizeInput(allergies) : null;

    // Validate subscription data
    await validateSubscriptionData(planId, mealTypeIds, deliveryDayIds);

    // Calculate price server-side
    const totalPrice = await calculateSubscriptionPrice(planId, mealTypeIds, deliveryDayIds);

    // Create subscription with transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create subscription
      const subscription = await tx.subscription.create({
        data: {
          name: sanitizedName,
          phone: sanitizedPhone,
          planId,
          allergies: sanitizedAllergies,
          totalPrice,
          userId: req.user?.id, // Associate with user if authenticated
        },
        include: {
          plan: {
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              basePrice: true,
            }
          },
        }
      });

      // Create meal type associations
      const mealTypeAssociations = mealTypeIds.map(mealTypeId => ({
        subscriptionId: subscription.id,
        mealTypeId,
      }));
      
      await tx.subscriptionMealType.createMany({
        data: mealTypeAssociations,
      });

      // Create delivery day associations
      const deliveryDayAssociations = deliveryDayIds.map(deliveryDayId => ({
        subscriptionId: subscription.id,
        deliveryDayId,
      }));
      
      await tx.subscriptionDeliveryDay.createMany({
        data: deliveryDayAssociations,
      });

      return subscription;
    });

    return NextResponse.json({
      success: true,
      message: 'Subscription berhasil dibuat',
      data: {
        id: result.id,
        name: result.name,
        phone: result.phone,
        plan: result.plan,
        totalPrice: result.totalPrice,
        status: result.status,
        createdAt: result.createdAt,
      },
    });

  } catch (error) {
    console.error("Error creating subscription:", error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

// GET - Fetch subscriptions with proper authorization
const getHandler = async (req: AuthenticatedRequest): Promise<NextResponse> => {
  try {
    await ensureDbConnection();
    
    const { searchParams } = new URL(req.url);
    
    // Parse and validate pagination parameters
    const paginationResult = paginationSchema.safeParse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
     
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

    const { page, limit } = paginationResult.data;
    const skip = (page - 1) * limit;

    // Build where clause based on user role
    let whereClause: Record<string, unknown> = {};
    
    if (req.user?.role === 'ADMIN') {
      // Admin can see all subscriptions
     
    } else if (req.user) {
      // Regular users can only see their own subscriptions
      whereClause = {
        userId: req.user.id,
       
      };
    } else {
      // Unauthenticated users cannot access subscriptions
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }



    // Fetch subscriptions with relationships
    const [subscriptions, total] = await Promise.all([
      prisma.subscription.findMany({
        where: whereClause,
        include: {
          plan: {
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              basePrice: true,
            }
          },
          mealTypes: {
            include: {
              mealType: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  icon: true,
                  timeRange: true,
                }
              }
            }
          },
          deliveryDays: {
            include: {
              deliveryDay: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  dayOfWeek: true,
                }
              }
            }
          },
          user: req.user?.role === 'ADMIN' ? {
            select: {
              id: true,
              name: true,
              email: true,
            }
          } : false,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.subscription.count({ where: whereClause }),
    ]);

    // Transform data for response
    const transformedSubscriptions = subscriptions.map(subscription => ({
      id: subscription.id,
      name: subscription.name,
      phone: subscription.phone,
      allergies: subscription.allergies,
      totalPrice: subscription.totalPrice,
      status: subscription.status,
      createdAt: subscription.createdAt,
      updatedAt: subscription.updatedAt,
      plan: subscription.plan,
      mealTypes: subscription.mealTypes.map(mt => mt.mealType),
      deliveryDays: subscription.deliveryDays.map(dd => dd.deliveryDay),
      user: subscription.user,
    }));

    return NextResponse.json({
      success: true,
      message: 'Subscriptions fetched successfully',
      data: transformedSubscriptions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

// Export handlers with middleware
export const POST = createApiHandler(postHandler, {
  auth: { requireAuth: true },             // User must be logged in to create subscription
  rateLimit: { maxRequests: 50, windowMs: 60000 }, // 50 requests per minute
  csrf: true,
});

export const GET = createApiHandler(getHandler, {
  auth: { requireAuth: true }, // Require authentication for viewing subscriptions
  rateLimit: { maxRequests: 50, windowMs: 60000 }, // 50 requests per minute
}); 