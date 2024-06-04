import React from 'react';
import styles from './landing.module.css';

const AboutUs: React.FC = () => {
    const randomText = "Clippy strives to streamline your coding experience by providing a centralized repository for commonly used code snippets. Its intuitive interface allows you to quickly add, retrieve, and share reusable items. Open source and free forever. Get started now!";

    return (
        <div className={styles.aboutContainer} id="about">
            <div className={styles.title}>
                <h2>About Us</h2>
            </div>
            <div className={styles.descriptionAbout}>
                <p>{randomText}</p>
            </div>
        </div>
    );
};

export default AboutUs;
