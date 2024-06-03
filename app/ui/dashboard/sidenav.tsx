import styles from './dashboard.module.css';
import Link from 'next/link';
import CollectionBox from './collection_list'
import { SessionUser, _getUserFromSession } from '@/app/lib/auth';
import { Collection } from '@prisma/client';
import { getAllCollections } from '@/app/lib/db';

export default async function SideNav() {
  const user: SessionUser = _getUserFromSession();
  const collections: Collection[] = await getAllCollections(user?.id);

  // For setting the public collections box to be extra large in case
  // the private collections are not rendered. This is the case when
  // the user is not logged in.
  let fullHeight: boolean = false;

  let privateCollections: Collection[];
  let publicCollections: Collection[] = collections;
  if (user) {
    privateCollections = collections.filter(
      (coll) => !coll.public
    );
    publicCollections = collections.filter(
      (coll) => coll.public
    );
  }
  else {
    fullHeight = true;
  }
  return (
    <div className={styles.sidenav}>
      <Link href="/create/item">
        <button className="btn btn-primary btn-lg btn-block">+ Add Item</button>
      </Link>
      <CollectionBox title="Public Collections" collections={publicCollections} fullHeight={fullHeight}/>
      { user? <CollectionBox title="Your Private Collections" collections={privateCollections} fullHeight={fullHeight}/>: ""}
    </div>
  );
}
