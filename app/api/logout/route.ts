import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  // Log out the user
  try {
    cookies().set("session", "");
    return NextResponse.json({message: "logout successful"}, {status: 200})
  }
  catch(error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
