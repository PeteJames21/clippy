import { getUserFromSession } from "@/app/lib/auth";
import { cookies } from "next/headers";

export default function UserNameDiv() {
    const session = cookies().get("session");
    if (!session || !session.value) {
      return (
        <div>Not logged in</div>
      );
    }
    const email: string = JSON.parse(session.value).user.email;
    return (
      <div>{email}</div>
    );
}
