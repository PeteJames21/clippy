import { cookies } from "next/headers";
import LoginForm from "@/app/ui/forms/LoginForm";
import { redirect } from "next/navigation";
export default function page() {
  const session = cookies().get("session");
  if (!session || !session.value) {
    return (
      <LoginForm />
    );
  }
  else {
    return(
      redirect('/dashboard')
    );
  }
}
