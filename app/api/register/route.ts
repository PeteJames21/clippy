import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    const formData = await req.formData();
    const email = formData.get('email').toString();
    const password = formData.get('password').toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword
      }
    });

    return NextResponse.json(
      {id: user.id}, {status: 200}
    );
  }
