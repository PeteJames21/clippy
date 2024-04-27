import styles from './dashboard.module.css';

export default function Header() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>(●'◡'●)</div>
      <div><input type="text" id="searchInput" className={styles["search-content"]} placeholder="Search for content..." /></div>
      <div className={styles['header-right']}>
        <img src='avatar.jpg' alt="Avatar" className={styles.avatar} />
      </div>
    </nav>
  );
}
