import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserFromSession } from "@/app/lib/auth";
import { getAllCollections } from "@/app/lib/db";

export async function GET(req: NextRequest) {
  const user = await getUserFromSession(req);
  const prisma = new PrismaClient();
  try {
    const collections = await getAllCollections(user?.id);
    return NextResponse.json(JSON.stringify(collections), {status: 200});
  }
  catch(error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
