import { getUserFromSession } from "@/app/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getUserFromSession(req);
  if (user === null) {
    return NextResponse.json({message: "No user credentials found"}, {status: 401});
  }

  const prisma = new PrismaClient();
  try {
    const items = await prisma.textItem.findMany({
      where: {
        userID: user.id
      }
    });
    return NextResponse.json(JSON.stringify(items), {status: 200});
  }
  catch(error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
