"use client";

import styles from './dashboard.module.css';
import {collections} from '../../lib/data';
import {useState} from 'react';

export default function CollectionBox({repo}) {
  const itemsList = collections;  // Replace with async fetch
  const [items, setItems] = useState(itemsList);

  return (
    <div className={styles["collection-box"]}>
      <span>{repo}</span>
      <div className={styles["collection-list"]}>
        {items.map((obj, index) => (
          <CollectionItem key={obj.id} item={obj} />
        ))}
      </div>
    </div>
  );
}

function CollectionItem({ item }) {
  return (
    <div className={styles["collection-item"]}>
      <img src={item.imgURL} width={20} height={20} />
      <span>{item.title}</span>
      <CounterBadge n_items={item.n_items}/>
    </div>
  );
}

function CounterBadge({n_items}) {
  return (
    <div className={styles["counter-badge"]}>{n_items}</div>
  );
}
