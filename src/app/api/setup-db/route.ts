import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Check database status
export async function GET() {
  try {
    const [
      plansCount,
      mealTypesCount,
      deliveryDaysCount,
      tagsCount,
      allergensCount,
      ingredientsCount
    ] = await Promise.all([
      prisma.plan.count().catch(() => 0),
      prisma.mealType.count().catch(() => 0),
      prisma.deliveryDay.count().catch(() => 0),
      prisma.tag.count().catch(() => 0),
      prisma.allergen.count().catch(() => 0),
      prisma.ingredient.count().catch(() => 0)
    ]);

    const isSetup = plansCount > 0 && mealTypesCount > 0 && deliveryDaysCount > 0;

    return NextResponse.json({
      success: true,
      message: "Database status checked",
      data: {
        isSetup,
        counts: {
          plans: plansCount,
          mealTypes: mealTypesCount,
          deliveryDays: deliveryDaysCount,
          tags: tagsCount,
          allergens: allergensCount,
          ingredients: ingredientsCount
        }
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to check database status",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

// POST - Setup database with initial data
export async function POST(request: NextRequest) {
  try {
    console.log("🔧 Starting database setup...");

    // Check if setup is needed by looking for Plan table
    const existingPlans = await prisma.plan.findMany().catch(() => null);
    
    if (existingPlans && existingPlans.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Database already set up",
        data: { alreadySetup: true }
      });
    }

    console.log("📦 Seeding database with initial data...");

    // 1. Create Plans
    const plans = await Promise.all([
      prisma.plan.create({
        data: {
          name: "Basic Plan",
          slug: "basic",
          description: "Perfect for individuals starting their healthy eating journey",
          basePrice: 150000,
          features: JSON.stringify([
            "5 meals per week",
            "Basic nutritional info",
            "Standard delivery",
            "Email support"
          ]),
          color: "from-green-400 to-green-600",
          sortOrder: 1
        }
      }),
      prisma.plan.create({
        data: {
          name: "Premium Plan",
          slug: "premium",
          description: "Ideal for families or those who want variety and flexibility",
          basePrice: 280000,
          features: JSON.stringify([
            "10 meals per week",
            "Detailed nutritional breakdown",
            "Priority delivery",
            "Phone & email support",
            "Meal customization"
          ]),
          color: "from-blue-400 to-blue-600",
          sortOrder: 2
        }
      }),
      prisma.plan.create({
        data: {
          name: "Enterprise Plan",
          slug: "enterprise",
          description: "Complete solution for offices, events, or large groups",
          basePrice: 500000,
          features: JSON.stringify([
            "20+ meals per week",
            "Complete nutritional analysis",
            "Same-day delivery",
            "24/7 dedicated support",
            "Full meal customization",
            "Bulk ordering discounts",
            "Event catering services"
          ]),
          color: "from-purple-400 to-purple-600",
          sortOrder: 3
        }
      })
    ]);

    // 2. Create Meal Types
    const mealTypes = await Promise.all([
      prisma.mealType.create({
        data: {
          name: "Breakfast",
          slug: "breakfast",
          icon: "☀️",
          timeRange: "06:00 - 10:00",
          sortOrder: 1
        }
      }),
      prisma.mealType.create({
        data: {
          name: "Lunch",
          slug: "lunch", 
          icon: "🌤️",
          timeRange: "11:00 - 14:00",
          sortOrder: 2
        }
      }),
      prisma.mealType.create({
        data: {
          name: "Dinner",
          slug: "dinner",
          icon: "🌙",
          timeRange: "17:00 - 21:00",
          sortOrder: 3
        }
      }),
      prisma.mealType.create({
        data: {
          name: "Snacks",
          slug: "snacks",
          icon: "🍎",
          timeRange: "Anytime",
          sortOrder: 4
        }
      })
    ]);

    // 3. Create Delivery Days  
    const deliveryDays = await Promise.all([
      prisma.deliveryDay.create({
        data: {
          name: "Monday",
          slug: "monday",
          dayOfWeek: 1
        }
      }),
      prisma.deliveryDay.create({
        data: {
          name: "Tuesday", 
          slug: "tuesday",
          dayOfWeek: 2
        }
      }),
      prisma.deliveryDay.create({
        data: {
          name: "Wednesday",
          slug: "wednesday", 
          dayOfWeek: 3
        }
      }),
      prisma.deliveryDay.create({
        data: {
          name: "Thursday",
          slug: "thursday",
          dayOfWeek: 4
        }
      }),
      prisma.deliveryDay.create({
        data: {
          name: "Friday",
          slug: "friday",
          dayOfWeek: 5
        }
      }),
      prisma.deliveryDay.create({
        data: {
          name: "Saturday",
          slug: "saturday",
          dayOfWeek: 6
        }
      }),
      prisma.deliveryDay.create({
        data: {
          name: "Sunday", 
          slug: "sunday",
          dayOfWeek: 0
        }
      })
    ]);

    // 4. Create Tags
    const tags = await Promise.all([
      prisma.tag.create({
        data: {
          name: "Vegetarian",
          slug: "vegetarian",
          color: "#22c55e"
        }
      }),
      prisma.tag.create({
        data: {
          name: "High Protein",
          slug: "high-protein",
          color: "#ef4444"
        }
      }),
      prisma.tag.create({
        data: {
          name: "Low Carb",
          slug: "low-carb", 
          color: "#3b82f6"
        }
      }),
      prisma.tag.create({
        data: {
          name: "Gluten Free",
          slug: "gluten-free",
          color: "#f59e0b"
        }
      })
    ]);

    // 5. Create Allergens
    const allergens = await Promise.all([
      prisma.allergen.create({
        data: {
          name: "Gluten",
          icon: "🌾"
        }
      }),
      prisma.allergen.create({
        data: {
          name: "Dairy",
          icon: "🥛"
        }
      }),
      prisma.allergen.create({
        data: {
          name: "Nuts",
          icon: "🥜"
        }
      }),
      prisma.allergen.create({
        data: {
          name: "Seafood",
          icon: "🦐"
        }
      })
    ]);

    // 6. Create Ingredients
    const ingredients = await Promise.all([
      prisma.ingredient.create({
        data: {
          name: "Chicken Breast",
          category: "Protein"
        }
      }),
      prisma.ingredient.create({
        data: {
          name: "Brown Rice",
          category: "Carbohydrate"
        }
      }),
      prisma.ingredient.create({
        data: {
          name: "Broccoli",
          category: "Vegetable"
        }
      }),
      prisma.ingredient.create({
        data: {
          name: "Olive Oil",
          category: "Fat"
        }
      })
    ]);

    console.log("✅ Database setup completed successfully!");

    return NextResponse.json({
      success: true,
      message: "Database setup completed successfully",
      data: {
        plans: plans.length,
        mealTypes: mealTypes.length,
        deliveryDays: deliveryDays.length,
        tags: tags.length,
        allergens: allergens.length,
        ingredients: ingredients.length
      }
    });

  } catch (error) {
    console.error("❌ Database setup failed:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Database setup failed", 
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 