"use client";

import styles from './dashboard.module.css';
import {useEffect, useState} from 'react';

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
      <span className="h5">{repo}</span>
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
  return (
    <div className={styles["collection-item"]}>
      <img src={item.imgPath? item.imgPath: "/icons/code.png"} width={20} height={20} />
      <span>{item.name}</span>
      {/* <CounterBadge n_items={1}/> */}
    </div>
  );
}

function CounterBadge({n_items}) {
  return (
    <div className={styles["counter-badge"]}>{n_items}</div>
  );
}
