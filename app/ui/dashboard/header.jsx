import styles from './dashboard.module.css';
import Image from "next/image"
import LogoutButton from './logout_button';
import UserNameDiv from './user_name';

export default function Header() {
  return (
    <nav className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>(●'◡'●)</div>
      </div>
      <div className={styles.searchContainer}>
        <input type="text" id="searchInput" className={styles.searchContent} placeholder="Search for content..." />
      </div>
      {/* <div className={styles.avatarContainer}>
        <Image src='/avatar.jpg' alt="Avatar" className={styles.avatar} width={50} height={50} />
      </div> */}
      <UserNameDiv />
      <LogoutButton />
    </nav>
  );
}
