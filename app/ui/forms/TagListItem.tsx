import Image from "next/image";
import styles from "./forms.module.css";

export default function TagListItem({label}) {
  return (
    <div className={styles["tag-list-item"]}>
      {label}
      <Image className={styles["trash-icon"]} src="trash-icon.svg" width={20} height={20} alt=""/>
    </div>
  );
}
