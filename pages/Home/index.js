import React, { useState, useEffect } from 'react';
import './style.scss';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [
        '/assets/pic1.jpg',
        '/assets/pic2.jpg',
        '/assets/pic3.jpg',
        '/assets/pic4.jpg',
        '/assets/pic5.jpg'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [images.length]);

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="home-container">
            <div className="slider-container">
                <div className="slider">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                        >
                            <img src={image} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <div className="slider-nav">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                </div>
            </div>
            <div className="content-block">
                <h1>Welcome to Our Real Estate Platform</h1>
                <p>
                    Discover your dream home with our extensive selection of properties
                    across Poland's most desirable locations.
                </p>
            </div>
        </div>
    );
};

export default Home; 