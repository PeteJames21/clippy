import Image from "next/image";
import styles from "./forms.module.css";

export default function TagListItem({label, itemId}) {
  return (
    <div className={styles["tag-list-item"]}>
      {label}
      <Image
        id={itemId}
        className={styles["trash-icon"]}
        src="/trash-icon.svg" width={20} height={20}
        alt=""/>
    </div>
  );
}
