'use client'
// src/App.tsx

import React from 'react';
import Card from './Card';

// Example TextItem data
const textItems = [
  {
    id: 1,
    public: true,
    content: "These were the morning that slip by unnoticed, The blue jay chirped loudly and the frogs hurried home to rest after a noisy night.",
    description: "A blue jay chirping",
    tags: "bird,morning,hello,code,safaricom,chwing",
    collection: { name: "Birds Collection" }
  },
  // Add more TextItem objects here
];

const App: React.FC = () => {
  return (
    <div className="App">
      {textItems.map((item) => (
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
  );
};

export default App;
