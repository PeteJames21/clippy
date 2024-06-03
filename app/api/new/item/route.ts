import { NextRequest, NextResponse } from "next/server";
import { Collection, TextItem } from "@prisma/client";
import { getUserFromSession } from "@/app/lib/auth";
import { TextItemProps } from "@/app/lib/types";
import { createOrUpdateTextItem, getCollection } from "@/app/lib/db";


export async function POST(req: NextRequest) {
  const user = await getUserFromSession(req);
  if (user === null) {
    return NextResponse.json({message: "No user credentials found"}, {status: 401});
  }

  try {
    const data: TextItemProps = await req.json();
    data.userID = user.id;
    const itemID = await createOrUpdateTextItem(data);
    return NextResponse.json({itemID: itemID}, {status: 201});
  }
  catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
