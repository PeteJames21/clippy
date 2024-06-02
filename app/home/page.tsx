"use client"
import React from 'react';
import NavBar from '@/app/ui/landing/navbar'
import Content from '@/app/ui/landing/content'
import AboutUs from '@/app/ui/landing/about';
import ProjectScreenshots from '@/app/ui/landing/projectScreenshots';
import Authors from '../ui/landing/Authors';
import Footer from '../ui/landing/Footer';

import './global.css';   // Assuming you have the same CSS

const App: React.FC = () => {
    return (
        <div>
            <NavBar /> {/* Might need to use the already created navbar component */}
            <Content />
            <AboutUs />
            <ProjectScreenshots />
            < Authors />
            <Footer />

        </div>
    );
};

export default App;
