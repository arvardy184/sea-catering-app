import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@seacatering.com' }
    });

    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: 'Admin user already exists',
      }, { status: 400 });
    }

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123!', 12);
    
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@seacatering.com',
        name: 'SEA Catering Admin',
        password: adminPassword,
        role: 'ADMIN',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      data: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      }
    });

  } catch (err) {
    console.error("Error creating admin user:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 