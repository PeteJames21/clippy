import React from 'react';
import styles from './authors.module.css';
/* import author1Image from './author1.jpg';*/
import pete from '../../../public/authorImages/pete.jpeg';
import bencity from '../../../public/authorImages/bencity.jpg';

const Authors: React.FC = () => {
  return (
      <div className={styles.authorsContainer} id="project-authors">
          <div className={styles.headingContainer}>
              <h2 className={styles.heading}>Project Authors</h2>
          </div>
          <div className={styles.authorsWrapper}> {/* Added wrapper for flex layout */}
              <div className={styles.author}>
                  <img src={pete.src} alt="Author 1" className={styles.authorImage} />
                  <p className={styles.authorDescription}>
                      Peter Ndung'u is a software engineer with expertise in Python, JavaScript.
                  </p>
                  <div className={styles.socialMediaHandles}>
                      <a href="https://github.com/PeteJames21" target="_blank" rel="noopener noreferrer">Github:</a>
                      <a href="https://www.linkedin.com/in/peter-ndungu-101/" target="_blank" rel="noopener noreferrer">LinkedIn:</a>
                  </div>
              </div>
              <div className={styles.author}>
                  <img src={bencity.src} alt="Author 2" className={styles.authorImage} />
                  <p className={styles.authorDescription}>
                      Benson Maina is an Software Engineer with expertise in Python, JavaScript and Linux. When he is not coding, he is crafting water and energy solutions in Civil engineering. You can reach him via:
                  </p>
                  <div className={styles.socialMediaHandles}>
                      <a href="https://github.com/Gabogogi" target="_blank" rel="noopener noreferrer">Github:</a>
                      <a href="https://www.linkedin.com/in/benson-maina-a47b05295/" target="_blank" rel="noopener noreferrer">LinkedIn:</a>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Authors;