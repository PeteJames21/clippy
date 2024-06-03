"use client";

import Link from 'next/link';
import styles from './dashboard.module.css';
import { usePathname } from 'next/navigation';
import { CollectionWithCount } from '@/app/lib/types';
import { Collection } from '@prisma/client';

export default function CollectionBox(
  {title, collections, fullHeight}:
  {title: string, collections: Collection[], fullHeight: boolean}) {

  return (
    // Show placeholder text if collection is empty
    <div
      className={`${styles["collection-box"]} ${fullHeight? styles.tallBox: ""}`}
    >
      <span className="h5 text-center">{title}</span>
      {
        (collections.length === 0) ? <p className='text-center'>No items</p>:

        <div className={styles["collection-list"]}>
          {collections.sort(
            (a, b) => a.name.localeCompare(b.name)
          ).map((obj) => (
            <CollectionItem key={obj.id} item={obj} />
          ))}
        </div>
      }

    </div>
  );
}

function CollectionItem({ item }: {item: Collection}) {
  const path = usePathname();
  return (
    <div>
      <Link href={`${path}?collectionId=${item.id}`} className="link-primary">
        <div className={styles["collection-item"]} data-toggle="tooltip" data-placement="right" title={item.description}>
          <img src={item.imgPath? item.imgPath: "/icons/code.png"} width={20} height={20} />
          <span>{item.name}</span>
          <CounterBadge n_items={(item as CollectionWithCount)._count.items}/>
        </div>
      </Link>
    </div>
  );
}

function CounterBadge({n_items}) {
  if (n_items > 100000) {
    n_items = "100k+";
  }
  return (
    <div className={styles["counter-badge"]}>{n_items}</div>
  );
}
