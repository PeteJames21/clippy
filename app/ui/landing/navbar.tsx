import React from 'react';
import styles from './landing.module.css';

const NavBar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navUl}>
                <li><a href="#home" className={styles.navA}>Home</a></li>
                <li><a href="#about" className={styles.navA}>About</a></li>
                <li><a href="#services" className={styles.navA}>Services</a></li>
                <li><a href="#contact" className={styles.navA}>Contact</a></li>
            </ul>
        </nav>
    );
};

export default NavBar;
