import styles from './dashboard.module.css';
import Image from "next/image"
import LogoutButton from './logout_button';
import UserNameDiv from './user_name';
import LogoContainer from './LogoContainer';
import SearchContainer from './search_container';

export default function Header() {
  return (
    <nav className={styles.header}>
      <LogoContainer />
      <SearchContainer />
      {/* <div className={styles.avatarContainer}>
        <Image src='/avatar.jpg' alt="Avatar" className={styles.avatar} width={50} height={50} />
      </div> */}
      <UserNameDiv />
      <LogoutButton />
    </nav>
  );
}
