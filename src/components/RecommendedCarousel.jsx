import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecommendedCarousel = ({ recommendedProducts = [] }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % recommendedProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [recommendedProducts.length, isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % recommendedProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? recommendedProducts.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => setCurrentSlide(index);

  const handleShopNow = () => {
    const currentProduct = recommendedProducts[currentSlide];
    navigate(`/product/${currentProduct.id}`);
  };

  if (!recommendedProducts.length) return null;

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="carousel-title">Recommended For You</h2>
      <div className="carousel-wrapper">
        <button className="carousel-button prev" onClick={prevSlide}>
          <span className="arrow">‹</span>
        </button>

        <div className="carousel-slides">
          {recommendedProducts.map((product, index) => (
            <div
              key={product.id}
              className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
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
                  <div className="floating-badge">You May Like</div>
                </div>
                <div className="carousel-text">
                  <div className="product-category">Based on Your Taste</div>
                  <h3 className="product-title">{product.name}</h3>
                  <div className="price-container">
                    <span className="currency">₹</span>
                    <span className="carousel-price">{product.price}</span>
                    <span className="unit">/kg</span>
                  </div>
                  <div className="features">
                    <span className="feature-tag">Fresh</span>
                    <span className="feature-tag">Trending</span>
                    <span className="feature-tag">Picked For You</span>
                  </div>
                  <button className="carousel-cta" onClick={handleShopNow}>
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
        {recommendedProducts.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          >
            <div className="indicator-fill"></div>
          </button>
        ))}
      </div>

      <div className="carousel-progress">
        <div
          className="progress-fill"
          style={{
            width: `${((currentSlide + 1) / recommendedProducts.length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default RecommendedCarousel;
