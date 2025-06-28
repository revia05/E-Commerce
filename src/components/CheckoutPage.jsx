import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { OrdersContext } from "../context/OrdersContext";
import "./AmazonStyle.css";

const CheckoutPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { addOrder } = useContext(OrdersContext);
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    phone: ""
  });
  const [error, setError] = useState("");

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setError("");
    if (!shipping.name || !shipping.address || !shipping.phone) {
      setError("Please fill in all shipping details.");
      return;
    }
    const order = {
      id: Date.now(),
      items: cartItems,
      total: totalPrice,
      date: new Date().toLocaleString(),
      shipping
    };
    addOrder(order);
    setCartItems([]);
    navigate("/orders");
  };

  return (
    <div className="cart-page checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h2>Shipping Information</h2>
          {error && <div className="auth-error">{error}</div>}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={shipping.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" value={shipping.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={shipping.phone} onChange={handleChange} required />
          </div>
          <button type="submit" className="amazon-btn cart-checkout-btn">Place Order</button>
        </form>
        <div className="cart-summary checkout-summary">
          <h2>Order Summary</h2>
          <div className="checkout-items-list">
            {cartItems.map(item => (
              <div className="checkout-item" key={item.id}>
                <img src={item.image} alt={item.name} className="checkout-item-image" />
                <div className="checkout-item-details">
                  <div className="checkout-item-name">{item.name}</div>
                  <div className="checkout-item-qty">Qty: {item.quantity || 1}</div>
                  <div className="checkout-item-price">₹{item.price}</div>
                </div>
                <div className="checkout-item-subtotal">₹{item.price * (item.quantity || 1)}</div>
              </div>
            ))}
          </div>
          <div className="cart-summary-price">Total: ₹{totalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 