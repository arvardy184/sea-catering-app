import { NextResponse } from "next/server";

export async function GET() {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    
    return NextResponse.json({
      success: true,
      env_check: {
        DATABASE_URL_exists: !!databaseUrl,
        DATABASE_URL_length: databaseUrl?.length || 0,
        DATABASE_URL_starts_with: databaseUrl?.substring(0, 20) || "not found",
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        VERCEL_ENV: process.env.VERCEL_ENV
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 