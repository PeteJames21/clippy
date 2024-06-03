import { getUserFromSession } from "@/app/lib/auth";
import { createOrUpdateCollection } from "@/app/lib/db";
import { CollectionProps } from "@/app/ui/forms/create_collection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getUserFromSession(req);
  if (user === null) {
    return NextResponse.json({message: "No user credentials found"}, {status: 401});
  }

  try {
    const data: CollectionProps = await req.json();
    data.userId = user.id;
    await createOrUpdateCollection(data);
  }
  catch(error) {
    // TODO: return appriate 40X error if error is due to user not being authorized
    // to modify the resource
    return NextResponse.json({message: error.message}, {status: 500})
  }
  return NextResponse.json({}, {status: 201});
}
