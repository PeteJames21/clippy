import { redirect } from "next/navigation";
import { _getUserFromSession } from "./lib/auth";

export default function Page() {
  const user = _getUserFromSession();
  return (
    user? redirect('/dashboard'): redirect("/home")
  );
}
