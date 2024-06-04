import styles from './dashboard.module.css';

export default function Card({obj}) {
  return (
    <div className={styles.card}>
      <img src={obj.imgURL} width={100} height={100} />
      <span>{obj.title}</span>
      <span>{obj.collection}</span>
      <span>@{obj.owner}</span>
    </div>
  );
}
