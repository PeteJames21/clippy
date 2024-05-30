'use client'
// src/App.tsx

import React from 'react';
import Card from './Card';


const App: React.FC = () => {
  return (
    <div className="App">
      <Card
        title="Card Title "
        bodyContent="The blue jay chirpeThe blue jay chirped loudly in the early morning sunshine. The blue jay chirped loudly in the early morning sunshine.d hello loudly in the early morning sunshine. The blue jay chirped loudly in the early morning sunshine.The blue jay chirped loudly in the early morning sunshine. The blue jay chirped loudly in the early morning sunshine."
        footerContent="Footer Content"
      />
    </div>
  );
};

export default App;
