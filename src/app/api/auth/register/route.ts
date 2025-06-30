import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma, ensureDbConnection } from "@/lib/prisma"
import { sanitizeInput, validateEmail, validatePhone, validatePassword } from "@/lib/utils"

export async function POST(request: NextRequest) {
  try {
    // Ensure database connection before proceeding
    await ensureDbConnection()
    
    const body = await request.json()
    const { name, email, password, phone } = body

    // Input sanitization
    const sanitizedName = sanitizeInput(name || '')
    const sanitizedEmail = sanitizeInput(email || '').toLowerCase()
    const sanitizedPhone = phone ? sanitizeInput(phone) : null

    // Validation
    if (!sanitizedName || !sanitizedEmail || !password) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, password" },
        { status: 400 }
      )
    }

    // Name validation
    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters" },
        { status: 400 }
      )
    }

    // Email validation
    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Password validation
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: passwordValidation.errors.join(', ') },
        { status: 400 }
      )
    }

    // Phone validation (if provided)
    if (sanitizedPhone && !validatePhone(sanitizedPhone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: sanitizedEmail }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user with sanitized data
    const user = await prisma.user.create({
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        password: hashedPassword,
        phone: sanitizedPhone,
        role: "USER",
      },
    })

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: userWithoutPassword,
    })

  } catch (err) {
    console.error("Error creating user:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 