import React from 'react';
import styles from './landing.module.css';

const AboutUs: React.FC = () => {
    const randomText = "This project aims to streamline your workflow by offering a simple, intuitive interface and powerful features designed to enhance productivity and collaboration. Built with modern technologies, our solution ensures a seamless experience across all devices, making it easier to manage tasks and projects efficiently.";

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
