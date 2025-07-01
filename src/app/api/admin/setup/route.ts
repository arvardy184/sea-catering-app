import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    // Get admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'corps@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Arvan123!';
    const adminName = process.env.ADMIN_NAME || 'SEA Catering Admin';

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: 'Admin user already exists',
      }, { status: 400 });
    }

    // Create admin user with hashed password
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        name: adminName,
        password: hashedPassword,
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