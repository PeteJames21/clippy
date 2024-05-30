import { NextRequest } from "next/server";

type SessionUser = {
  email: string,
  id: number
}

/**
 * Return the session as an object
 */
export async function getSession(req: NextRequest) {
  const session = req.cookies.get("session");
  if (!session || !session.value) {
    return null;
  }
  return JSON.parse(session.value);
}


/**
 * Get user from the session. Note that the password field is excluded
 */
export async function getUserFromSession(req: NextRequest): Promise<SessionUser> {
  const session = await getSession(req);
  if (session) {
    const user: SessionUser = session.user;
    return user;
  }
  else {
    return null;
  }
}

/**
 * Refresh the session expiration date and return it.
 */
export function getSessionExpiration() {
  const t = parseInt(process.env.SESSION_EXPIRES, 10) * 3600 * 1000;
  const expires = new Date(Date.now() + t);
  return expires;
}
