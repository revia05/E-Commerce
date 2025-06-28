import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./AmazonStyle.css";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const [showFloatingSearch, setShowFloatingSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const floatingInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showFloatingSearch && floatingInputRef.current) {
      floatingInputRef.current.focus();
    }
  }, [showFloatingSearch]);

  const handleFloatingSearch = (e) => {
    e.preventDefault();
    // You can add search logic here
    setShowFloatingSearch(false);
  };

  return (
    <header className="amazon-header">
      <div className="amazon-logo">
        <Link to="/">🛒 FlourShop</Link>
      </div>

      <div className="amazon-nav">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/signin" className="signin-link">Sign In</Link>
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
        </Link>
        {scrolled && (
          <button
            className="header-search-icon-btn"
            aria-label="Open search"
            onClick={() => setShowFloatingSearch(true)}
          >
            <svg
              className="header-search-icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        )}
      </div>
      {/* Floating Search Input */}
      <div className={`floating-search-backdrop${showFloatingSearch ? " show" : ""}`} onClick={() => setShowFloatingSearch(false)} />
      <div className={`floating-search${showFloatingSearch ? " show" : ""}`}>
        <form className="floating-search-form" onSubmit={handleFloatingSearch} onClick={e => e.stopPropagation()}>
          <input
            ref={floatingInputRef}
            type="text"
            className="floating-search-input"
            placeholder="Search flour products..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
          <button type="submit" className="floating-search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
