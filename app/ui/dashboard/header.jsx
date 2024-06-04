import styles from './dashboard.module.css';
// import Image from "next/image"
import LogoutButton from './logout_button';
import UserNameDiv from './user_name';
import LogoContainer from './LogoContainer';
import SearchContainer from './search_container';
import { _getUserFromSession } from '@/app/lib/auth';
import LoginButton from './login_button';

export default function Header() {
  const user = _getUserFromSession();

  return (
    <nav className={styles.header}>
      <LogoContainer />
      <SearchContainer />
      {/* <div className={styles.avatarContainer}>
        <Image src='/avatar.jpg' alt="Avatar" className={styles.avatar} width={50} height={50} />
      </div> */}
      <UserNameDiv />
      {
        user?
          <LogoutButton /> :
        <LoginButton/>
      }
    </nav>
  );
}
