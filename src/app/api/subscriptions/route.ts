import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureDbConnection } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Ensure database connection before proceeding
    await ensureDbConnection();
    
    const body = await request.json();
    const { name, phone, plan, mealTypes, deliveryDays, allergies, totalPrice } = body;

    // Validation
    if (!name || !phone || !plan || !mealTypes || !deliveryDays || totalPrice === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: name, phone, plan, mealTypes, deliveryDays, totalPrice" },
        { status: 400 }
      );
    }

    // Create subscription
    const subscription = await prisma.subscription.create({
      data: {
        name,
        phone,
        plan,
        mealTypes: JSON.stringify(mealTypes),
        deliveryDays: JSON.stringify(deliveryDays),
        allergies: allergies || null,
        totalPrice,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Subscription created successfully',
      data: subscription,
    });

  } catch (err) {
    console.error("Error creating subscription:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Ensure database connection before proceeding
    await ensureDbConnection();
    
    const subscriptions = await prisma.subscription.findMany({
      orderBy: {
        createdAt: 'desc'
      },
    });

    // Parse JSON fields for response
    const parsedSubscriptions = subscriptions.map((subscription) => ({
      ...subscription,
      mealTypes: JSON.parse(subscription.mealTypes),
      deliveryDays: JSON.parse(subscription.deliveryDays),
    }));

    return NextResponse.json({
      success: true,
      message: 'Subscriptions fetched successfully',
      data: parsedSubscriptions,
    });

  } catch (err) {
    console.error("Error fetching subscriptions:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 