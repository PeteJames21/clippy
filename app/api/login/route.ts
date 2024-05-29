import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { addUserToSession } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const formData = await req.formData();
  const email = formData.get("email").toString();
  const password = formData.get("password").toString();

  // Retrieve user from the database
  const result = await prisma.user.findMany({
    where: {
      email: email
    }
  });
  if (result.length === 0) {
    return NextResponse.json({message: "User not found"}, {status: 401});
  }

  // Verify password
  const user = result[0];
  const same = await bcrypt.compare(password, user.password);
  if (!same){
    return NextResponse.json({message: "Invalid password"}, {status: 401});
  }

  // Add user to session
  try {
    await addUserToSession(user);
  }
  catch(error) {
    return NextResponse.json({message: error.message}, {status: 409});
  }

  return NextResponse.json({id: 1123}, {status: 200});
}
