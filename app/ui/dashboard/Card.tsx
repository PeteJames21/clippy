import React, { useState } from 'react';
import styles from "@/app/ui/dashboard/card.module.css";

interface CardProps {
  id: number;
  title: string;
  bodyContent: string | React.ReactNode;
  footerContent: string | React.ReactNode;
}

const Card: React.FC<CardProps> = ({ id, title, bodyContent, footerContent }) => {
  const [tooltipText, setTooltipText] = useState<string>('');

  const handleCopy = () => {
    navigator.clipboard.writeText(bodyContent.toString()).then(() => {
      setTooltipText('Copied!');
      setTimeout(() => {
        setTooltipText('Click to copy');
      }, 2000);
    }).catch((error) => {
      console.error('Failed to copy:', error);
    });
  };

  const handleMouseEnter = () => {
    setTooltipText('Click to copy');
  };

  const handleMouseLeave = () => {
    setTooltipText('');
  };

  const trimmedBodyContent = typeof bodyContent === 'string' && bodyContent.length > 120 ? bodyContent.substring(0, 120) + "..." : bodyContent;

  return (
    <div className={styles.card} key={id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={styles["card-header"]}>
        {title}
      </div>
      <div className={styles["card-body"]} onClick={handleCopy}>
        {trimmedBodyContent}
        {tooltipText && <span className={styles["tooltip"]}>{tooltipText}</span>}
      </div>
      <div className={styles["card-footer"]}>
        <div>Tags: {footerContent.tags}</div>
        {/* <div>Collection: {footerContent.collection}</div> */}
      </div>
    </div>
  );
};

export default Card;
