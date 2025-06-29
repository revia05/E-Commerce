import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import "./AmazonStyle.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, isInWishlist } = useContext(WishlistContext);

  const isInWishlistState = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  
    // Track clicked product in localStorage
    let viewed = JSON.parse(localStorage.getItem("userClickedProducts") || "[]");
    if (!viewed.includes(product.id)) {
      viewed.push(product.id);
      localStorage.setItem("userClickedProducts", JSON.stringify(viewed));
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="amazon-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="product-card-image-container">
      {product.image ? (
  <img src={product.image} alt={product.name} />
) : (
  <img src="/img/default.jpg" alt="default product" />
)}

        <button
          className={`wishlist-btn ${isInWishlistState ? 'wishlist-btn-active' : ''}`}
          onClick={e => { 
            e.stopPropagation(); 
            addToWishlist(product); 
            
            // Also track in localStorage
            let viewed = JSON.parse(localStorage.getItem("userClickedProducts") || "[]");
            if (!viewed.includes(product.id)) {
              viewed.push(product.id);
              localStorage.setItem("userClickedProducts", JSON.stringify(viewed));
            }
          }}
          
        >
          {isInWishlistState ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="amazon-card-body">
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <div className="product-card-actions">
          <button
            className="amazon-btn"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
