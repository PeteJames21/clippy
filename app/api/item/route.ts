import { getUserFromSession } from "@/app/lib/auth";
import { PrismaClient, TextItem } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getUserFromSession(req);
  if (user === null) {
    return NextResponse.json({message: "No user credentials found"}, {status: 401});
  }

  const prisma = new PrismaClient();
  const params = req.nextUrl.searchParams;
  const collectionId = Number(params.get("collectionId"));
  try {
    let items: TextItem[];
    if (collectionId){
      // From the specified collection, get all items belonging to the
      // user and items from other users marked as public.
      items = await prisma.textItem.findMany({
        where: {
          collectionId,
          OR: [
            {userID: user.id}, {public: true}
          ]
        }
      });
    }
    else {
      // Return all items from the database belonging to the user
      items = await prisma.textItem.findMany({
        where: {
          userID: user.id
        }
      });
    }
    return NextResponse.json(JSON.stringify(items), {status: 200});
  }
  catch(error) {
    return NextResponse.json({message: error.message}, {status: 500});
    }
}
