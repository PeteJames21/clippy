import React from 'react';
import styles from './landing.module.css';

interface NavBarProps {
  scrollToAbout: () => void;
  scrollToAuthors: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ scrollToAbout, scrollToAuthors }) => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navUl}>
                <li><button className={styles.navA}>Home</button></li>
                <li><button onClick={scrollToAbout} className={styles.navA}>About</button></li>
                <li><button onClick={scrollToAuthors} className={styles.navA}>Contact</button></li>
            </ul>
        </nav>
    );
};

export default NavBar;
