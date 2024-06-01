'use client';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import './CardContainerStyles.css'; // Import the CSS file
import { usePathname, useSearchParams } from 'next/navigation';
import styles from "@/app/ui/dashboard/dashboard.module.css";

export default function CardContainer() {
  const [items, setItems] = useState([]);
  const params = useSearchParams();

  async function fetchItemList() {
    // Fetch items using query params as the filter.
    // All items are returned if no params are specified.
    const resp = await fetch(`/api/item?${params.toString()}`);
    if (resp.ok) {
      const res = await resp.json();
      setItems(JSON.parse(res));
    }
    else {
      // TODO: Render error message in container
    }
  }

  // Fetch collections from the db.
  useEffect(
    () => {
      fetchItemList();
    }, [params]
  );

  return (
    <div>
      <div className={styles.cardContainer}>
        {items.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.description}
            bodyContent={item.content}
            footerContent={{
              tags: item.tags,
              collection: item.collectionId
            }}
          />
        ))}
      </div>
    </div>
  );
};
