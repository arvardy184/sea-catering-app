import { NextResponse } from "next/server";
import { generateCSRFToken } from "@/lib/csrf";
import { createApiHandler } from "@/lib/auth-middleware";

const csrfHandler = async (): Promise<NextResponse> => {
  try {
    // Generate CSRF token
    const csrfToken = generateCSRFToken();
    
    return NextResponse.json({
      success: true,
      csrfToken,
    });
  } catch (error) {
    console.error("Error generating CSRF token:", error);
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500 }
    );
  }
};


export const GET = createApiHandler(csrfHandler, {
  rateLimit: { maxRequests: 100, windowMs: 60000 }, // 100 requests per minute
}); 