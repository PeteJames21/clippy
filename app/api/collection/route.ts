import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserFromSession } from "@/app/lib/auth";

export async function GET(req: NextRequest) {
  const user = getUserFromSession(req);
  if (user === null) {
    return NextResponse.json({message: "No user credentials found"}, {status: 401});
  }

  const prisma = new PrismaClient();
  try {
    const collections = await prisma.collection.findMany();
    return NextResponse.json(JSON.stringify(collections), {status: 200});
  }
  catch(error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
