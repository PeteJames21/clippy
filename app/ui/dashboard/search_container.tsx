"use client";
import styles from "@/app/ui/dashboard/dashboard.module.css";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function SearchContainer() {
  const [text, setText] = useState("");
  const path = usePathname();
  const router = useRouter();

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    router.push(`${path}?q=${event.target.value}`);
  }


  return (
    <div className={styles.searchContainer}>
        <input
          type="text"
          id="searchInput"
          onChange={handleOnChange}
          className={styles.searchContent}
          placeholder="Search for content..." />
    </div>
  );
}
