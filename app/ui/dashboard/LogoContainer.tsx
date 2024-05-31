"use client";
import styles from "@/app/ui/dashboard/dashboard.module.css";
import { useRouter } from "next/navigation";

export default function LogoContainer() {
  const router = useRouter();

  function handleOnClick() {
    // Navigate to the root of the dashboard when the logo is clicked
    router.push("/dashboard");
  }

  return (
    <div className={styles.logoContainer} onClick={handleOnClick}>
        <div className={styles.logo}>(●'◡'●)</div>
    </div>
  );
}
