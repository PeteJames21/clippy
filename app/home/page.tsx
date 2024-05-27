"use client"
import React from 'react';
import NavBar from '@/app/ui/landing/navbar'
import Content from '@/app/ui/landing/content'
import './styles.css';  // Assuming you have the same CSS

const App: React.FC = () => {
    return (
        <div>
            <NavBar />
            <Content />
        </div>
    );
};

export default App;