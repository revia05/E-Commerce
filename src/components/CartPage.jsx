import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./AmazonStyle.css";

const CartPage = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven't added anything to your cart yet.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items-list">
          {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p className="cart-item-price">₹{item.price}</p>
                <div className="cart-quantity-controls">
                  <button onClick={() => decreaseQuantity(item.id)} className="cart-qty-btn">-</button>
                  <span className="cart-qty">{item.quantity || 1}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="cart-qty-btn">+</button>
                </div>
                <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
              <div className="cart-item-subtotal">
                <span>Subtotal:</span>
                <span>₹{item.price * (item.quantity || 1)}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Subtotal ({totalItems} items):</h2>
          <div className="cart-summary-price">₹{totalPrice}</div>
          <button className="amazon-btn cart-checkout-btn" onClick={() => alert('Proceed to checkout (not implemented)')}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
