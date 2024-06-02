/* Content.tsx */
import React from 'react';
import useChangingHeading from './useChangingHeading';
import styles from './landing.module.css';

const Content: React.FC = () => {
    const changingHeadingRef = useChangingHeading();

    return (
        <div className={styles.container}>
            <div className={styles.textContent}>
                <h1 className={styles.changingHead}>
                    <span ref={changingHeadingRef} className={styles.changingHeading}>Get More Done</span>
                </h1>
                <h1 className={styles.changingHead}>Just Clip It</h1>
                <p className={styles.catchPhrase}>A simpler way to do the things you do.</p>
                <button className={styles.cta}>Get Started</button>
            </div>
            <div className={styles.imageContent}></div>
        </div>
    );
};

export default Content;
