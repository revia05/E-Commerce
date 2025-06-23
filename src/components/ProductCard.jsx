import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./AmazonStyle.css";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const isAdded = cartItems.some((item) => item.id === product.id);

  return (
    <div className="amazon-card">
      <img src={product.image} alt={product.name} />
      <div className="amazon-card-body">
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <button
          className={isAdded ? "amazon-btn amazon-remove" : "amazon-btn"}
          onClick={() => addToCart(product)}
        >
          {isAdded ? "❌ Remove from Cart" : "🛒 Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
