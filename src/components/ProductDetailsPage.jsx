import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { dummyProducts } from "../data/dummyProducts";
import "./AmazonStyle.css";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, isInWishlist } = useContext(WishlistContext);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("1kg");
  
  // Find the product by ID
  const product = dummyProducts.find(p => p.id === parseInt(productId));
  
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/")}>Go back to home</button>
      </div>
    );
  }

  const isInWishlistState = isInWishlist(product.id);

  // Size-based pricing
  const sizePrices = {
    "500g": Math.round(product.price * 0.6),
    "1kg": product.price,
    "2kg": Math.round(product.price * 1.8),
    "5kg": Math.round(product.price * 4.2)
  };

  const currentPrice = sizePrices[selectedSize];
  const originalPrice = Math.round(currentPrice * 1.2);

  // Mock product images (in real app, these would come from product data)
  const productImages = [
    product.image,
    product.image, // Using same image for demo
    product.image,
    product.image
  ];

  // Mock product specifications
  const specifications = {
    "Brand": "Premium Flour Co.",
    "Type": product.name.includes("Atta") ? "Whole Wheat" : product.name.includes("Besan") ? "Chickpea" : "Rice",
    "Weight": selectedSize,
    "Shelf Life": "12 months",
    "Storage": "Store in a cool, dry place",
    "Origin": "India",
    "Certification": "FSSAI Approved",
    "Allergen Info": "Contains Gluten",
    "Nutrition Facts": "Rich in protein and fiber"
  };

  // Mock reviews
  const reviews = [
    { id: 1, user: "Rahul S.", rating: 5, comment: "Excellent quality flour. Makes perfect rotis!", date: "2024-01-15" },
    { id: 2, user: "Priya M.", rating: 4, comment: "Good product, reasonable price. Will buy again.", date: "2024-01-10" },
    { id: 3, user: "Amit K.", rating: 5, comment: "Best flour I've ever used. Highly recommended!", date: "2024-01-08" }
  ];

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, size: selectedSize, price: currentPrice });
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity, size: selectedSize, price: currentPrice });
    navigate("/checkout");
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="product-details-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span onClick={() => navigate("/")} style={{ cursor: 'pointer', color: '#2874f0' }}>Home</span>
        <span> › </span>
        <span onClick={() => navigate("/")} style={{ cursor: 'pointer', color: '#2874f0' }}>Flour Products</span>
        <span> › </span>
        <span>{product.name}</span>
      </div>

      <div className="product-details-container">
        {/* Left Section - Images */}
        <div className="product-images-section">
          <div className="main-image-container">
            <img 
              src={productImages[selectedImage]} 
              alt={product.name} 
              className="main-product-image"
            />
            <div className="image-overlay-badge">Featured</div>
          </div>
          
          <div className="thumbnail-images">
            {productImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                className={`thumbnail-image ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Section - Product Info */}
        <div className="product-info-section">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-rating">
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className={star <= averageRating ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-text">{averageRating.toFixed(1)} ({reviews.length} ratings)</span>
            </div>
          </div>

          <div className="product-price-section">
            <div className="price-container">
              <span className="currency">₹</span>
              <span className="current-price">{currentPrice}</span>
              <span className="original-price">₹{originalPrice}</span>
              <span className="discount">20% off</span>
            </div>
            <div className="delivery-info">
              <span className="delivery-text">Free delivery by Tomorrow</span>
            </div>
          </div>

          <div className="product-options">
            <div className="size-selection">
              <h3>Select Size</h3>
              <div className="size-options">
                {Object.entries(sizePrices).map(([size, price]) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    <div className="size-text">{size}</div>
                    <div className="size-price">₹{price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selection">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="product-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button 
              className={`wishlist-btn-large ${isInWishlistState ? 'active' : ''}`}
              onClick={() => addToWishlist(product)}
            >
              {isInWishlistState ? '❤️' : '🤍'} Wishlist
            </button>
          </div>

          <div className="product-highlights">
            <h3>Highlights</h3>
            <ul>
              <li>100% Natural and Pure</li>
              <li>No Artificial Preservatives</li>
              <li>Rich in Protein and Fiber</li>
              <li>Perfect for Indian Cooking</li>
              <li>FSSAI Certified</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="product-tabs">
        <div className="tab-content">
          <div className="tab-section">
            <h3>Product Description</h3>
            <p>
              {product.name} is a premium quality flour made from carefully selected grains. 
              This flour is perfect for making traditional Indian breads, pastries, and other 
              culinary delights. It is stone-ground to preserve natural nutrients and flavor.
            </p>
            <p>
              Our flour is sourced from the finest farms and processed using modern technology 
              while maintaining traditional quality standards. It's free from artificial additives 
              and preservatives, making it a healthy choice for your family.
            </p>
          </div>

          <div className="tab-section">
            <h3>Specifications</h3>
            <div className="specifications-table">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="spec-row">
                  <span className="spec-key">{key}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="tab-section">
            <h3>Customer Reviews</h3>
            <div className="reviews-container">
              {reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">{review.user}</span>
                    <div className="review-rating">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} className={star <= review.rating ? 'star filled' : 'star'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage; 