import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message, rating, location } = body;

    // Validation
    if (!name || !message || !rating) {
      return NextResponse.json(
        { error: "Missing required fields: name, message, rating" },
        { status: 400 }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Create testimonial
    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        message,
        rating: parseInt(rating),
        location: location || null,
        approved: false, // Default to false for moderation
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Testimonial submitted successfully',
      data: testimonial,
    });

  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Only fetch approved testimonials for public display
    const testimonials = await prisma.testimonial.findMany({
      where: {
        approved: true
      },
      orderBy: {
        createdAt: 'desc'
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Testimonials fetched successfully',
      data: testimonials,
    });

  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}