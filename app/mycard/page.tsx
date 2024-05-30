'use client'
import React from 'react';
import Card from './Card';
import { items_list2 } from "@/app/lib/data";
import './styles.css'; // Import the CSS file

const App: React.FC = () => {
  return (
    <div>
      <div className="CardContainer">
        {items_list2.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.description}
            bodyContent={item.content}
            footerContent={{
              tags: item.tags,
              collection: item.collection.name
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
