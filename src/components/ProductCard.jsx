import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import "./AmazonStyle.css";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const { wishlistItems, addToWishlist, isInWishlist } = useContext(WishlistContext);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  
  const isInCart = cartItems.some((item) => item.id === product.id);
  const isInWishlistState = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product);
      setShowAddedMessage(true);
      // Hide the message after 2 seconds
      setTimeout(() => {
        setShowAddedMessage(false);
      }, 2000);
    }
  };

  return (
    <div className="amazon-card">
      <div className="product-card-image-container">
        <img src={product.image} alt={product.name} />
        <button
          className={`wishlist-btn ${isInWishlistState ? 'wishlist-btn-active' : ''}`}
          onClick={() => addToWishlist(product)}
          aria-label={isInWishlistState ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isInWishlistState ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="amazon-card-body">
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <div className="product-card-actions">
          <button
            className={showAddedMessage ? "amazon-btn amazon-success" : "amazon-btn"}
            onClick={handleAddToCart}
            disabled={showAddedMessage}
          >
            {showAddedMessage ? "✅ Added to Cart!" : "🛒 Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
