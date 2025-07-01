import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureDbConnection } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    await ensureDbConnection();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const popular = searchParams.get('popular');

    const whereClause: {
      category?: string;
      popular?: boolean;
    } = {};
    
    if (category && category !== 'all') {
      whereClause.category = category;
    }
    
    if (popular === 'true') {
      whereClause.popular = true;
    }

    const mealPlans = await prisma.mealPlan.findMany({
      where: whereClause,
      include: {
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
                color: true,
              }
            }
          }
        },
        ingredients: {
          include: {
            ingredient: {
              select: {
                id: true,
                name: true,
                category: true,
              }
            }
          },
          orderBy: {
            ingredient: {
              name: 'asc'
            }
          }
        },
        allergens: {
          include: {
            allergen: {
              select: {
                id: true,
                name: true,
                icon: true,
              }
            }
          }
        }
      },
      orderBy: [
        { popular: 'desc' },
        { rating: 'desc' },
        { createdAt: 'desc' }
      ],
    });

    // Transform relational data for response  
    const transformedMealPlans = mealPlans.map(mealPlan => ({
      id: mealPlan.id,
      name: mealPlan.name,
      category: mealPlan.category,
      description: mealPlan.description,
      price: mealPlan.price,
      calories: mealPlan.calories,
      cookingTime: mealPlan.cookingTime,
      rating: mealPlan.rating,
      popular: mealPlan.popular,
      protein: mealPlan.protein,
      carbs: mealPlan.carbs,
      fats: mealPlan.fats,
      fiber: mealPlan.fiber,
      createdAt: mealPlan.createdAt,
      updatedAt: mealPlan.updatedAt,
      tags: mealPlan.tags.map(t => t.tag),
      ingredients: mealPlan.ingredients.map(i => ({
        ...i.ingredient,
        quantity: i.quantity,
        unit: i.unit,
      })),
      allergens: mealPlan.allergens.map(a => a.allergen),
    }));

    return NextResponse.json({
      success: true,
      message: 'Meal plans fetched successfully',
      data: transformedMealPlans,
    });

  } catch (err) {
    console.error("Error fetching meal plans:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure database connection before proceeding
    await ensureDbConnection();
    
    const body = await request.json();
    const { 
      name, 
      category, 
      description, 
      price, 
      calories, 
      cookingTime, 
      rating = 4.5,
      tags = [], // eslint-disable-line @typescript-eslint/no-unused-vars
      popular = false,
      protein,
      carbs,
      fats,
      fiber,
      ingredients = [], // eslint-disable-line @typescript-eslint/no-unused-vars
      allergens = [] // eslint-disable-line @typescript-eslint/no-unused-vars
    } = body;

    // Validation
    if (!name || !category || !description || !price || !calories || !cookingTime) {
      return NextResponse.json(
        { error: "Missing required fields: name, category, description, price, calories, cookingTime" },
        { status: 400 }
      );
    }

    // Create meal plan with relational data
    const mealPlan = await prisma.mealPlan.create({
      data: {
        name,
        category,
        description,
        price: parseFloat(price),
        calories: parseInt(calories),
        cookingTime,
        rating: parseFloat(rating),
        popular,
        protein: protein ? parseFloat(protein) : null,
        carbs: carbs ? parseFloat(carbs) : null,
        fats: fats ? parseFloat(fats) : null,
        fiber: fiber ? parseFloat(fiber) : null,
        // Note: For now, creating meal plan without relations
        // In a real app, you'd create relations separately or use transaction
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        ingredients: {
          include: {
            ingredient: true
          }
        },
        allergens: {
          include: {
            allergen: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Meal plan created successfully',
      data: mealPlan,
    });

  } catch (err) {
    console.error("Error creating meal plan:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
