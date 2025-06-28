import React, { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AmazonStyle.css";

const AccountDropdown = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="account-dropdown" ref={dropdownRef}>
      <button className="account-button" onClick={toggleDropdown}>
        <svg 
          className="account-icon" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        {isAuthenticated() && user && (
          <span className="user-name">{user.name}</span>
        )}
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          {isAuthenticated() ? (
            // Logged in user menu
            <>
              <div className="dropdown-header">
                <span className="welcome-text">Hello, {user?.name || 'User'}!</span>
              </div>
              <Link to="/orders" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11H1l3-7 9 13.71L9 11zM22 4h-6.31l2.31 8L22 4z"/>
                </svg>
                Orders
              </Link>
              <Link to="/rewards" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Rewards
              </Link>
              <Link to="/giftcard" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 10h20"/>
                </svg>
                Gift Cards
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout-item" onClick={handleLogout}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Log Out
              </button>
            </>
          ) : (
            // Guest user menu
            <>
              <div className="dropdown-header">
                <span className="welcome-text">Welcome to FlourShop!</span>
              </div>
              <Link to="/login" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10,17 15,12 10,7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                Login
              </Link>
              <Link to="/signup" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
                Sign Up
              </Link>
              <div className="dropdown-divider"></div>
              <Link to="/orders" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11H1l3-7 9 13.71L9 11zM22 4h-6.31l2.31 8L22 4z"/>
                </svg>
                Orders
              </Link>
              <Link to="/rewards" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Rewards
              </Link>
              <Link to="/giftcard" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 10h20"/>
                </svg>
                Gift Cards
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountDropdown; 