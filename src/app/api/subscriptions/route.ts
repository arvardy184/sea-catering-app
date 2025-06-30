import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureDbConnection } from "@/lib/prisma";
import { sanitizeInput, validatePhone } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    // Ensure database connection before proceeding
    await ensureDbConnection();
    
    const body = await request.json();
    const { name, phone, plan, mealTypes, deliveryDays, allergies, totalPrice } = body;

    // Input sanitization
    const sanitizedName = sanitizeInput(name || '');
    const sanitizedPhone = sanitizeInput(phone || '');
    const sanitizedPlan = sanitizeInput(plan || '');
    const sanitizedAllergies = allergies ? sanitizeInput(allergies) : null;

    // Validation
    if (!sanitizedName || !sanitizedPhone || !sanitizedPlan || !mealTypes || !deliveryDays || totalPrice === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: name, phone, plan, mealTypes, deliveryDays, totalPrice" },
        { status: 400 }
      );
    }

    // Additional validation
    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters" },
        { status: 400 }
      );
    }

    // Phone validation
    if (!validatePhone(sanitizedPhone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Plan validation
    const validPlans = ['diet', 'protein', 'royal'];
    if (!validPlans.includes(sanitizedPlan.toLowerCase())) {
      return NextResponse.json(
        { error: "Invalid plan. Must be one of: diet, protein, royal" },
        { status: 400 }
      );
    }

    // Meal types validation
    if (!Array.isArray(mealTypes) || mealTypes.length === 0) {
      return NextResponse.json(
        { error: "At least one meal type must be selected" },
        { status: 400 }
      );
    }

    const validMealTypes = ['breakfast', 'lunch', 'dinner'];
    const invalidMealTypes = mealTypes.filter(type => !validMealTypes.includes(type));
    if (invalidMealTypes.length > 0) {
      return NextResponse.json(
        { error: "Invalid meal types. Must be one of: breakfast, lunch, dinner" },
        { status: 400 }
      );
    }

    // Delivery days validation
    if (!Array.isArray(deliveryDays) || deliveryDays.length === 0) {
      return NextResponse.json(
        { error: "At least one delivery day must be selected" },
        { status: 400 }
      );
    }

    const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const invalidDays = deliveryDays.filter(day => !validDays.includes(day));
    if (invalidDays.length > 0) {
      return NextResponse.json(
        { error: "Invalid delivery days" },
        { status: 400 }
      );
    }

    // Total price validation
    const numericPrice = parseFloat(totalPrice);
    if (isNaN(numericPrice) || numericPrice < 0) {
      return NextResponse.json(
        { error: "Invalid total price" },
        { status: 400 }
      );
    }

    // Create subscription with sanitized data
    const subscription = await prisma.subscription.create({
      data: {
        name: sanitizedName,
        phone: sanitizedPhone,
        plan: sanitizedPlan.toLowerCase(),
        mealTypes: JSON.stringify(mealTypes),
        deliveryDays: JSON.stringify(deliveryDays),
        allergies: sanitizedAllergies,
        totalPrice: numericPrice,
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