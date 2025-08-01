import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import AccountDropdown from "./AccountDropdown";
import "./AmazonStyle.css";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const [showFloatingSearch, setShowFloatingSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const floatingInputRef = useRef(null);

  // Calculate total quantity of all products in cart
  const totalCartQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

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
        <Link to="/">
          <img src="/img/logo.png" alt="FlourShop Logo" className="logo-image" />
          <span className="logo-text">FlourShop</span>
        </Link>
      </div>

      <div className="amazon-nav">
        <AccountDropdown />
        <Link to="/wishlist" className="wishlist-link">
          <div className="wishlist-icon-container">
            <svg 
              className="wishlist-icon" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {wishlistItems.length > 0 && (
              <span className="wishlist-count">{wishlistItems.length}</span>
            )}
          </div>
        </Link>
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
            {totalCartQuantity > 0 && (
              <span className="cart-count">{totalCartQuantity}</span>
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
