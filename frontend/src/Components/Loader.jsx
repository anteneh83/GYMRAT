import React from 'react';
import './Loader.css'; // Adjust path if necessary

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p className="loader-text">Loading Data...</p>
        </div>
    );
};

export default Loader;
