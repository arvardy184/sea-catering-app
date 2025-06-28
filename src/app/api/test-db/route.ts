import { NextResponse } from "next/server";

// Test database connection - v5 (detailed debugging)
export async function GET() {
  try {
    // Check if DATABASE_URL exists
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        success: false,
        error: "DATABASE_URL not found in environment variables",
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Try to import Prisma Client
    let PrismaClient;
    try {
      const prismaModule = await import("@prisma/client");
      PrismaClient = prismaModule.PrismaClient;
    } catch (importError) {
      return NextResponse.json({
        success: false,
        error: "Failed to import Prisma Client",
        import_error: importError instanceof Error ? importError.message : "Unknown import error",
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Try to create Prisma client
    let prisma;
    try {
      prisma = new PrismaClient({
        log: ['error', 'warn']
      });
    } catch (clientError) {
      return NextResponse.json({
        success: false,
        error: "Failed to create Prisma Client",
        client_error: clientError instanceof Error ? clientError.message : "Unknown client error",
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Try to query database
    try {
      const result = await prisma.$queryRaw`SELECT 1 as test`;
      await prisma.$disconnect();
      
      return NextResponse.json({
        success: true,
        message: "Database connection successful",
        result,
        timestamp: new Date().toISOString()
      });
    } catch (queryError) {
      await prisma.$disconnect();
      return NextResponse.json({
        success: false,
        error: "Database query failed",
        query_error: queryError instanceof Error ? queryError.message : "Unknown query error",
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Unexpected error in test-db:", error);
    
    return NextResponse.json({
      success: false,
      error: "Unexpected error",
      details: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 