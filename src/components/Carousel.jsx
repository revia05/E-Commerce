import React, { useState, useEffect } from "react";
import { dummyProducts } from "../data/dummyProducts";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get unique products for carousel (one from each category)
  const carouselProducts = [
    dummyProducts[0], // Multigrain Atta
    dummyProducts[1], // Besan Flour
    dummyProducts[2], // Rice Flour
    dummyProducts[3], // Maida
    dummyProducts[4], // Wheat Flour
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselProducts.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [carouselProducts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? carouselProducts.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <button className="carousel-button prev" onClick={prevSlide}>
          &#8249;
        </button>
        
        <div className="carousel-slides">
          {carouselProducts.map((product, index) => (
            <div
              key={product.id}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              <div className="carousel-content">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="carousel-image"
                />
                <div className="carousel-text">
                  <h3>{product.name}</h3>
                  <p className="carousel-price">₹{product.price}</p>
                  <button className="carousel-cta">Shop Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-button next" onClick={nextSlide}>
          &#8250;
        </button>
      </div>

      <div className="carousel-indicators">
        {carouselProducts.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel; 