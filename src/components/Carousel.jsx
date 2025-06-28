import React, { useState, useEffect } from "react";
import { dummyProducts } from "../data/dummyProducts";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Get unique products for carousel (one from each category)
  const carouselProducts = [
    dummyProducts[0], // Multigrain Atta
    dummyProducts[1], // Besan Flour
    dummyProducts[2], // Rice Flour
    dummyProducts[3], // Maida
    dummyProducts[4], // Wheat Flour
  ];

  // Auto-slide functionality with pause on hover
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselProducts.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [carouselProducts.length, isHovered]);

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
    <div 
      className="carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-wrapper">
        <button className="carousel-button prev" onClick={prevSlide}>
          <span className="arrow">‹</span>
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
                <div className="carousel-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="carousel-image"
                  />
                  <div className="image-overlay"></div>
                  <div className="floating-badge">Featured</div>
                </div>
                <div className="carousel-text">
                  <div className="product-category">Premium Quality</div>
                  <h3 className="product-title">{product.name}</h3>
                  <div className="price-container">
                    <span className="currency">₹</span>
                    <span className="carousel-price">{product.price}</span>
                    <span className="unit">/kg</span>
                  </div>
                  <div className="features">
                    <span className="feature-tag">100% Natural</span>
                    <span className="feature-tag">Fresh</span>
                    <span className="feature-tag">Pure</span>
                  </div>
                  <button className="carousel-cta">
                    <span>Shop Now</span>
                    <span className="cta-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-button next" onClick={nextSlide}>
          <span className="arrow">›</span>
        </button>
      </div>

      <div className="carousel-indicators">
        {carouselProducts.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          >
            <div className="indicator-fill"></div>
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="carousel-progress">
        <div 
          className="progress-fill"
          style={{ width: `${((currentSlide + 1) / carouselProducts.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Carousel; 
