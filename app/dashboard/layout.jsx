import Header from "../ui/dashboard/header";
import SideNav from "../ui/dashboard/sidenav";
import styles from "../ui/dashboard/dashboard.module.css"

export default function Layout ({ children }) {
  return (
    <>
      <Header />
      <SideNav />
      <div className={styles.main}>{ children }</div>
    </>
  );
}
