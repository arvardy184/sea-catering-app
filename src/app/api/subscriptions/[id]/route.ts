import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action, pauseStart, pauseEnd } = body;

    if (!action) {
      return NextResponse.json(
        { error: "Action is required (pause, cancel, reactivate)" },
        { status: 400 }
      );
    }

    let updateData: {
      updatedAt: Date;
      status?: string;
      pauseStart?: Date | null;
      pauseEnd?: Date | null;
      cancelledAt?: Date | null;
      reactivatedAt?: Date | null;
    } = {
      updatedAt: new Date()
    };

    switch (action) {
      case 'pause':
        if (!pauseStart || !pauseEnd) {
          return NextResponse.json(
            { error: "pauseStart and pauseEnd are required for pause action" },
            { status: 400 }
          );
        }
        updateData = {
          ...updateData,
          status: 'paused',
          pauseStart: new Date(pauseStart),
          pauseEnd: new Date(pauseEnd)
        };
        break;

      case 'cancel':
        updateData = {
          ...updateData,
          status: 'cancelled',
          cancelledAt: new Date()
        };
        break;

      case 'reactivate':
        updateData = {
          ...updateData,
          status: 'active',
          reactivatedAt: new Date(),
          pauseStart: null,
          pauseEnd: null
        };
        break;

      default:
        return NextResponse.json(
          { error: "Invalid action. Must be 'pause', 'cancel', or 'reactivate'" },
          { status: 400 }
        );
    }

    // Update subscription
    const subscription = await prisma.subscription.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: `Subscription ${action}d successfully`,
      data: subscription,
    });

  } catch (err) {
    console.error(`Error updating subscription:`, err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const subscription = await prisma.subscription.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    // Parse JSON fields for response
    const parsedSubscription = {
      ...subscription,
      mealTypes: JSON.parse(subscription.mealTypes),
      deliveryDays: JSON.parse(subscription.deliveryDays),
    };

    return NextResponse.json({
      success: true,
      message: 'Subscription fetched successfully',
      data: parsedSubscription,
    });

  } catch (err) {
    console.error("Error fetching subscription:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.subscription.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Subscription deleted successfully',
    });

  } catch (err) {
    console.error("Error deleting subscription:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 