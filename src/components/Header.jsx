import React from "react";
import { Link } from "react-router-dom";
import "./AmazonStyle.css";

const Header = () => (
  <header className="amazon-header">
    <div className="amazon-logo">
      <Link to="/">🛒 FlourShop</Link>
    </div>

    <div className="amazon-nav">
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/cart" className="cart-link">🛍 Cart</Link>
    </div>
  </header>
);

export default Header;
