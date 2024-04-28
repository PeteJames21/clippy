  import styles from './dashboard.module.css';
  import CollectionBox from './collection_list'

export default function SideNav() {
  return (
    <div className={styles.sidenav}>
      <button>+ Add Item</button>
      <CollectionBox repo="Public Collection"/>
      <CollectionBox repo="Private Collection"/>
    </div>
  );
}
