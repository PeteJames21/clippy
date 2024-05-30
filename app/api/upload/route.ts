import { NextRequest, NextResponse } from "next/server";
import { Collection, PrismaClient, TextItem } from "@prisma/client";
import { getUserFromSession } from "@/app/lib/auth";

type uploadItemFormData = {
  visibility: "private" | "public",
  itemType: "text" | "image",
  imgURL: string,
  description: string,
  collectionName: string,
  textItemContent: string,
  tags: string[]
}


export async function POST(req: NextRequest) {
  const user = await getUserFromSession(req);
  if (user === null) {
    return NextResponse.json({message: "No user credentials found"}, {status: 401});
  }
  const data: uploadItemFormData = await req.json();
  const prisma = new PrismaClient();

  // Add text item to the db. NOTE: image items not supported yet

  let collection: Collection;
  let item: TextItem;

  // Create collection if it does not exist
  try {
    collection = await prisma.collection.findUnique({
      where: {
        name: data.collectionName.toLocaleLowerCase()
      }
    })
    if (collection === null) {
      collection = await prisma.collection.create({
        data: {
          name: data.collectionName,
        }
      })
    }
  }
  catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }

  try {
    // Add item to the collection
    const isPulic = (data.visibility === "public");
    item = await prisma.textItem.create({
      data: {
        public: isPulic,
        content: data.textItemContent,
        description: data.description,
        tags: data.tags.join(" ").toLocaleLowerCase(),
        collectionId: collection.id,
        userID: user.id
      }
    })
  }
  catch(error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }

  return NextResponse.json({id: item.id}, {status: 201});
}
