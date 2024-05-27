import React from 'react';
import useChangingHeading from './useChangingHeading';

const Content: React.FC = () => {
    const changingHeadingRef = useChangingHeading();

    return (
        <div className="container">
            <div className="text-content">
                <h1><span ref={changingHeadingRef} id="changing-heading">Get More Done</span> </h1>
                <h1>Just Clip It</h1>
                <p>A simpler way to do the things you do.</p>
                <button className="cta">Get Started</button>
            </div>
            <div className="image-content"></div>
        </div>
    );
};

export default Content;
