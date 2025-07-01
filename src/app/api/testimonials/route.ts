import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureDbConnection } from "@/lib/prisma";
import { sanitizeInput } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    // Ensure database connection before proceeding
    await ensureDbConnection();
    
    const body = await request.json();
    const { name, message, rating, location } = body;

    // Input sanitization
    const sanitizedName = sanitizeInput(name || '');
    const sanitizedMessage = sanitizeInput(message || '');
    const sanitizedLocation = location ? sanitizeInput(location) : null;

    // Validation
    if (!sanitizedName || !sanitizedMessage || !rating) {
      return NextResponse.json(
        { error: "Missing required fields: name, message, rating" },
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

    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 1000) {
      return NextResponse.json(
        { error: "Message must be between 10 and 1000 characters" },
        { status: 400 }
      );
    }

    // Validate rating range
    const numericRating = parseInt(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Create testimonial with sanitized data
    const testimonial = await prisma.testimonial.create({
      data: {
        name: sanitizedName,
        message: sanitizedMessage,
        rating: numericRating,
        location: sanitizedLocation,
        approved: true, // Auto approve
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Testimonial submitted successfully',
      data: testimonial,
    });

  } catch (err) {
    console.error("Error creating testimonial:", err);
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
    
    // Fetch all testimonials
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: 'desc'
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Testimonials fetched successfully',
      data: testimonials,
    });

  } catch (err) {
    console.error("Error fetching testimonials:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}