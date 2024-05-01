import Card from './card';
import styles from './dashboard.module.css';

export default function Grid({items}) {
  return(
    <div className={styles.grid}>
      {
        items.map(
          (item, index) => <Card obj={item} key={item.id} />
        )
      }
    </div>
  );
}
