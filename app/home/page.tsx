"use client"
import React from 'react';
import NavBar from '@/app/ui/landing/navbar'
import Content from '@/app/ui/landing/content'
import AboutUs from '@/app/ui/landing/about';
import ProjectScreenshots from '@/app/ui/landing/projectScreenshots';
import Authors from '../ui/landing/Authors';
import Footer from '../ui/landing/Footer';

import styles from "@/app/ui/landing/landing.module.css"

const App: React.FC = () => {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToAuthors = () => {
        const authorsSection = document.getElementById('project-authors');
        if (authorsSection) {
            authorsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className={`${styles.body}`}>
            <NavBar scrollToAbout={scrollToAbout} scrollToAuthors={scrollToAuthors}/> {/* Might need to use the already created navbar component */}
            <Content />
            <AboutUs />
            <ProjectScreenshots />
            < Authors />
            <Footer />

        </div>
    );
};

export default App;
