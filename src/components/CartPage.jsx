import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="search-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="no-results">Your cart is empty.</p>
      ) : (
        <div className="results-grid">
          {cartItems.map((product) => (
            <div key={product.id} className="card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button
                className="btn btn-remove"
                onClick={() => removeFromCart(product.id)}
              >
                ❌ Remove from Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
