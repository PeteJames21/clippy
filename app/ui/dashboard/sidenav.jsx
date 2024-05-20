  import styles from './dashboard.module.css';
  import Link from 'next/link';
  import CollectionBox from './collection_list'

export default function SideNav() {
  return (
    <div className={styles.sidenav}>
      <Link href="/upload">
      <button>+ Add Item</button>
      </Link>
      <CollectionBox repo="Public Collection"/>
      <CollectionBox repo="Private Collection"/>
    </div>
  );
}
