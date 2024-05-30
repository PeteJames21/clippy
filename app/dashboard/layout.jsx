import Header from "../ui/dashboard/header";
import SideNav from "../ui/dashboard/sidenav";
import styles from "../ui/dashboard/dashboard.module.css"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import App from "@/app/mycard/page"

export default function Layout ({ children }) {
  const session = cookies().get("session");
    if (!session || !session.value) {
      return redirect("/login");
    }
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.content}>
        <SideNav />
       {/*  <div className={styles.main}>{ children }</div> */}
        <div><App /></div>
      </div>
    </div>
  );
}
