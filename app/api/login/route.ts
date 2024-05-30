import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { getSession, getSessionExpiration } from "@/app/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  // Verify that no other session is in progress
  const session = await getSession(req);
  if (session) {
    return NextResponse.json(
      {message: "A session already exists. Log out first"},
      {status: 409}
    );
  }

  const prisma = new PrismaClient();
  const formData = await req.formData();
  const email = formData.get("email").toString();
  const password = formData.get("password").toString();

  // Retrieve user from the database
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
  if (!user) {
    return NextResponse.json({message: "User not found"}, {status: 401});
  }

  // Verify password
  const same = await bcrypt.compare(password, user.password);
  if (!same){
    return NextResponse.json({message: "Invalid password"}, {status: 401});
  }

  // Add user to session
  try {
    const sessionValue = {user: {email: user.email, id: user.id}};
    const expires = getSessionExpiration();
    cookies().set("session", JSON.stringify(sessionValue), {expires, httpOnly: true});
    return NextResponse.json({message: "login successful"}, {status: 201})
  }
  catch(error) {
    return NextResponse.json({message: error.message}, {status: 409});
  }
}
