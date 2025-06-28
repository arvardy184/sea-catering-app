import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Test database connection - v3
export async function GET() {
  let prismaTest: PrismaClient | null = null;
  
  try {
    // Create new Prisma client with explicit connection options
    prismaTest = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      },
      log: ['error', 'warn']
    });

    // Test connection with timeout
    const result = await Promise.race([
      prismaTest.$queryRaw`SELECT 1 as test`,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000)
      )
    ]);
    
    return NextResponse.json({
      success: true,
      message: "Database connection successful with SSL",
      result,
      connection_info: {
        database_url_length: process.env.DATABASE_URL?.length,
        node_env: process.env.NODE_ENV
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Database connection error:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      error_name: error instanceof Error ? error.constructor.name : "Unknown",
      connection_info: {
        database_url_length: process.env.DATABASE_URL?.length,
        node_env: process.env.NODE_ENV
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  } finally {
    if (prismaTest) {
      await prismaTest.$disconnect();
    }
  }
} 