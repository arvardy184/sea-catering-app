import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message }: ContactFormData = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    console.log("📧 New Contact Form Submission:", {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message:
        "Pesan Anda telah terkirim! Tim SEA Catering akan menghubungi Anda dalam 1x24 jam.",
      data: {
        name,
        email,
        subject,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error("Error processing contact form:", err);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
export async function GET() {
  return NextResponse.json({
    message: "Contact API endpoint is working!",
    availableMethods: ["POST"],
    requiredFields: ["name", "email", "message"],
    optionalFields: ["phone", "subject"],
  });
}
