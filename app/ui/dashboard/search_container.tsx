"use client";
import styles from "@/app/ui/dashboard/dashboard.module.css";

export default function SearchContainer() {
  return (
    <div className={styles.searchContainer}>
        <input type="text" id="searchInput" className={styles.searchContent} placeholder="Search for content..." />
    </div>
  );
}
