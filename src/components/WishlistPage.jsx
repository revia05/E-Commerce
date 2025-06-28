import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import "./AmazonStyle.css";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, moveToCart } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleMoveToCart = (product) => {
    const productToMove = moveToCart(product);
    addToCart(productToMove);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="wishlist-empty-content">
          <div className="wishlist-empty-icon">💝</div>
          <h2>Your Wishlist is Empty</h2>
          <p>Start adding items to your wishlist to save them for later!</p>
          <a href="/" className="amazon-btn">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>Your Wishlist</h1>
        <p>{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}</p>
      </div>
      
      <div className="wishlist-grid">
        {wishlistItems.map((product) => (
          <div key={product.id} className="wishlist-item">
            <div className="wishlist-item-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="wishlist-item-details">
              <h3>{product.name}</h3>
              <p className="wishlist-item-price">₹{product.price}</p>
              <div className="wishlist-item-actions">
                <button
                  className="amazon-btn wishlist-move-to-cart"
                  onClick={() => handleMoveToCart(product)}
                >
                  🛒 Move to Cart
                </button>
                <button
                  className="amazon-btn amazon-remove wishlist-remove"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage; 