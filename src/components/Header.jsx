import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./AmazonStyle.css";

const Header = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <header className="amazon-header">
      <div className="amazon-logo">
        <Link to="/">🛒 FlourShop</Link>
      </div>

      <div className="amazon-nav">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart" className="cart-link">
          <div className="cart-icon-container">
            <svg 
              className="cart-icon" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </div>
          <span className="cart-text">Cart</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
