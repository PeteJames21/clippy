import { cookies } from "next/headers";
import { User } from "@prisma/client";


export async function getSession() {
  const session = cookies().get("session");
  if (!session)
    return null;
  return session;
}

export async function addUserToSession(user: User) {
  const session = cookies().get("session");
  if (session)
    throw new Error("A session already exists. Log out first");

  const sessionValue = {user: {email: user.email, id: user.id}};
  // Get cookie lifetime in milliseconds
  const t = parseInt(process.env.SESSION_EXPIRES, 10) * 3600 * 1000;
  const expires = new Date(Date.now() + t);
  cookies().set("session", JSON.stringify(sessionValue), {expires, httpOnly: true});
}
