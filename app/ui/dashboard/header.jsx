import styles from './dashboard.module.css';
import Image from "next/image"


export default function Header() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>(●'◡'●)</div>
      <div><input type="text" id="searchInput" className={styles["search-content"]} placeholder="Search for content..." /></div>
      <div className={styles['header-right']}>
        <Image src='/avatar.jpg' alt="Avatar" className={styles.avatar} width={50} height={50}/>
      </div>
    </nav>
  );
}
