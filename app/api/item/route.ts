import { getUserFromSession } from "@/app/lib/auth";
import { getAllTextItems, getItemsFromCollection, searchItems } from "@/app/lib/db";
import { TextItem } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getUserFromSession(req);
  const userID = user?.id;

  const params = req.nextUrl.searchParams;
  const collectionID = Number(params.get("collectionId"));
  const q = params.get("q");  // Entry from the search bar
  try {
    let items: TextItem[];
    if (q) {
      items = await searchItems(q, userID);
    }
    else if (collectionID){
      items = await getItemsFromCollection(collectionID, userID);
    }
    else {
      // Return all items from the database
      items = await getAllTextItems(userID);
    }
    return NextResponse.json(JSON.stringify(items), {status: 200});
  }
  catch(error) {
    console.log(error);
    return NextResponse.json({message: error.message}, {status: 500});
    }
}
