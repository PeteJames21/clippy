import React from 'react';
import styles from './screenshots.module.css';
import login from '../../../public/screenshots/login.jpg'
import add_item from '../../../public/screenshots/add_item.jpg'
import dashboard from '../../../public/screenshots/dashboard.jpg'

const ProjectScreenshots: React.FC = () => {
    return (
        <div className={styles.screenshotContainer}>
            <div className={styles.screenshot}>
                <img src={login.src} alt="Screenshot 1" className={styles.imageScreenshot} />
                <p className={styles.description}>Register and login into your account</p>
            </div>
            <div className={styles.screenshot}>
                <img src={add_item.src} alt="Screenshot 2" className={styles.imageScreenshot} />
                <p className={styles.description}>Add new items to your database</p>
            </div>
            <div className={styles.screenshot}>
                <img src={dashboard.src} alt="Screenshot 3" className={styles.imageScreenshot} />
                <p className={styles.description}>An overview of the dashboard.</p>
            </div>
        </div>
    );
};

export default ProjectScreenshots;
