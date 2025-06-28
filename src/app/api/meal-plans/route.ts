import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureDbConnection } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Ensure database connection before proceeding
    await ensureDbConnection();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const popular = searchParams.get('popular');

    // Build where clause based on query parameters
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
      orderBy: [
        { popular: 'desc' },
        { rating: 'desc' },
        { createdAt: 'desc' }
      ],
    });

    // Parse JSON fields for response
    const parsedMealPlans = mealPlans.map((mealPlan) => ({
      ...mealPlan,
      tags: JSON.parse(mealPlan.tags || '[]'),
      ingredients: JSON.parse(mealPlan.ingredients || '[]'),
      allergens: JSON.parse(mealPlan.allergens || '[]'),
    }));

    return NextResponse.json({
      success: true,
      message: 'Meal plans fetched successfully',
      data: parsedMealPlans,
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
      tags = [],
      popular = false,
      protein,
      carbs,
      fats,
      fiber,
      ingredients = [],
      allergens = []
    } = body;

    // Validation
    if (!name || !category || !description || !price || !calories || !cookingTime) {
      return NextResponse.json(
        { error: "Missing required fields: name, category, description, price, calories, cookingTime" },
        { status: 400 }
      );
    }

    // Create meal plan
    const mealPlan = await prisma.mealPlan.create({
      data: {
        name,
        category,
        description,
        price: parseFloat(price),
        calories: parseInt(calories),
        cookingTime,
        rating: parseFloat(rating),
        tags: JSON.stringify(tags),
        popular,
        protein: protein ? parseFloat(protein) : null,
        carbs: carbs ? parseFloat(carbs) : null,
        fats: fats ? parseFloat(fats) : null,
        fiber: fiber ? parseFloat(fiber) : null,
        ingredients: JSON.stringify(ingredients),
        allergens: JSON.stringify(allergens),
      },
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
