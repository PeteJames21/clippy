  import styles from './dashboard.module.css';
  import Link from 'next/link';
  import CollectionBox from './collection_list'

export default function SideNav() {
  return (
    <div className={styles.sidenav}>
      <Link href="/upload">
      <button className="btn btn-primary btn-lg btn-block">+ Add Item</button>
      </Link>
      <CollectionBox repo="My Code Collections"/>
    </div>
  );
}
