import { cookies } from "next/headers";
import LoginForm from "@/app/ui/forms/LoginForm";
import { redirect } from "next/navigation";
import styles from "@/app/ui/forms/login.module.css";

export default function Page() {
  const session = cookies().get("session");
  if (!session || !session.value) {
    return (
      <div className={styles.body}>
        <LoginForm />
      </div>
    );
  }
  else {
    return(
      redirect('/dashboard')
    );
  }
}
