import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import ProductDetailsModal from "./ProductDetailsModal";
import "./AmazonStyle.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, isInWishlist } = useContext(WishlistContext);
  const [showModal, setShowModal] = useState(false);

  const isInWishlistState = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="amazon-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <div className="product-card-image-container">
          <img src={product.image} alt={product.name} />
          <button
            className={`wishlist-btn ${isInWishlistState ? 'wishlist-btn-active' : ''}`}
            onClick={e => { e.stopPropagation(); addToWishlist(product); }}
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
              className="amazon-btn"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <ProductDetailsModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default ProductCard;
