import Header from "../ui/dashboard/header";
import SideNav from "../ui/dashboard/sidenav";
import styles from "../ui/dashboard/dashboard.module.css"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Layout ({ children }) {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.content}>
        <SideNav />
        <div className={styles.main}>{ children }</div>
      </div>
    </div>
  );
}
