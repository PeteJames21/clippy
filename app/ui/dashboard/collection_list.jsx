"use client";

import Link from 'next/link';
import styles from './dashboard.module.css';
import {useEffect, useState} from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function CollectionBox({repo}) {
  const [items, setItems] = useState([]);

  async function fetchCollectionList() {
    const resp = await fetch("/api/collection");
    if (resp.ok) {
      const res = await resp.json();
      setItems(JSON.parse(res));
    }
    else {
      // TODO: Render error message in box
    }
  }

  // Fetch collections from the db.
  useEffect(
    () => {
      fetchCollectionList();
    }, []
  );
  return (
    <div className={styles["collection-box"]}>
      <span className="h5 text-center">{repo}</span>
      <div className={styles["collection-list"]}>
        {items.sort(
          (a, b) => a.name.localeCompare(b.name)
        ).map((obj, index) => (
          <CollectionItem key={obj.id} item={obj} />
        ))}
      </div>
    </div>
  );
}

function CollectionItem({ item }) {
  const path = usePathname();
  return (
    <Link href={`${path}?collectionId=${item.id}`} className="link-primary">
      <div className={styles["collection-item"]}>
        <img src={item.imgPath? item.imgPath: "/icons/code.png"} width={20} height={20} />
        <span>{item.name}</span>
        {/* <CounterBadge n_items={1}/> */}
      </div>
    </Link>
  );
}

function CounterBadge({n_items}) {
  return (
    <div className={styles["counter-badge"]}>{n_items}</div>
  );
}
