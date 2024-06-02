import React from 'react';
import styles from './screenshots.module.css';

const ProjectScreenshots: React.FC = () => {
    return (
        <div className={styles.screenshotContainer}>
            <div className={styles.screenshot}>
                <img src="./ss1.jpg" alt="Screenshot 1" className={styles.imageScreenshot} />
                <p className={styles.description}>This is the first screenshot of our project showing the main dashboard.</p>
            </div>
            <div className={styles.screenshot}>
                <img src="./ss2.jpg" alt="Screenshot 2" className={styles.imageScreenshot} />
                <p className={styles.description}>This is the second screenshot demonstrating the user profile section.</p>
            </div>
            <div className={styles.screenshot}>
                <img src="./ss3.jpg" alt="Screenshot 3" className={styles.imageScreenshot} />
                <p className={styles.description}>This is the third screenshot showcasing the analytics page.</p>
            </div>
        </div>
    );
};

export default ProjectScreenshots;
