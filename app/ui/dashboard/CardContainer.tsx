'use client';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import './CardContainerStyles.css'; // Import the CSS file

export default function CardContainer() {
  const [items, setItems] = useState([]);

  async function fetchItemList() {
    console.log("calling func");
    const resp = await fetch("/api/item");
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
    }, []
  );

  return (
    <div>
      <div className="CardContainer">
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
