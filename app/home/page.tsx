"use client"
import React from 'react';
import NavBar from '@/app/ui/landing/navbar'
import Content from '@/app/ui/landing/content'
import './styles.css';  // Assuming you have the same CSS

const App: React.FC = () => {
    return (
        <div>
            <NavBar /> {/* Might need to use the already created navbar component */}
            <Content />
        </div>
    );
};

export default App;
