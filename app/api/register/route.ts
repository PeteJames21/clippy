import prisma from "@/app/lib/prisma_client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
    const formData = await req.formData();
    const email = formData.get('email').toString();
    const password = formData.get('password').toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if email is already in use
    const result = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if (result) {
      return NextResponse.json({message: "Email already in use"}, {status: 409});
    }

    // Register the user
    try {
      const user = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword
        }
      });
      return NextResponse.json({id: user.id}, {status: 201});
    }
    catch(error) {
      const message = "An unexpected error occured. Please try again";
      return NextResponse.json({message}, {status: 500});
    }
  }
