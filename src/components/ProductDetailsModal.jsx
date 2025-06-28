import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./AmazonStyle.css";

const ProductDetailsModal = ({ product, onClose }) => {
  const { addToCart } = useContext(CartContext);

  if (!product) return null;

  const handleBuy = () => {
    addToCart(product);
    onClose();
    alert("Proceed to checkout (not implemented)");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="product-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <img src={product.image} alt={product.name} className="modal-image" />
        <h2 className="modal-title">{product.name}</h2>
        <p className="modal-price">₹{product.price}</p>
        <p className="modal-description">{product.description || "No description available."}</p>
        <div className="modal-actions">
          <button className="amazon-btn" onClick={() => addToCart(product)}>Add to Cart</button>
          <button className="amazon-btn buy-btn" onClick={handleBuy}>Buy</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal; 