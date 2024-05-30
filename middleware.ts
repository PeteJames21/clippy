import { NextRequest, NextResponse } from "next/server";
import { getSessionExpiration } from "app/lib/auth";

export function middleware(req: NextRequest) {
  // Refresh the expiration date of the session cookie if present.
  const res = NextResponse.next();
  const sessionValue = req.cookies.get("session")?.value;
  if (!sessionValue) {
    return;
  }
  const t = getSessionExpiration();
  res.cookies.set(
    "session",
    sessionValue,
    {httpOnly: true, expires: t},
  );
  return res;
}
