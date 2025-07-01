import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SubscriptionStatus } from "@prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      status?: SubscriptionStatus;
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
          status: SubscriptionStatus.PAUSED,
          pauseStart: new Date(pauseStart),
          pauseEnd: new Date(pauseEnd)
        };
        break;

      case 'cancel':
        updateData = {
          ...updateData,
          status: SubscriptionStatus.CANCELLED,
          cancelledAt: new Date()
        };
        break;

      case 'reactivate':
        updateData = {
          ...updateData,
          status: SubscriptionStatus.ACTIVE,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const subscription = await prisma.subscription.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        plan: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            basePrice: true
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
                timeRange: true
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
                dayOfWeek: true
              }
            }
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

    // Transform relational data for response
    const { mealTypes, deliveryDays, ...subscriptionData } = subscription;
    const transformedSubscription = {
      ...subscriptionData,
      mealTypes: mealTypes.map(mt => mt.mealType),
      deliveryDays: deliveryDays.map(dd => dd.deliveryDay),
    };

    return NextResponse.json({
      success: true,
      message: 'Subscription fetched successfully',
      data: transformedSubscription,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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