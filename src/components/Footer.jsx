import React from "react";
import { Link } from "react-router-dom";
import "./AmazonStyle.css";

const Footer = () => {
  return (
    <footer className="amazon-footer">
      {/* Back to top button */}
      <div className="footer-back-to-top">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-top-btn"
        >
          Back to top
        </button>
      </div>

      {/* Main footer content */}
      <div className="footer-content">
        <div className="footer-section">
          <h3>Get to Know Us</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/press">Press Releases</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Make Money with Us</h3>
          <ul>
            <li><Link to="/sell">Sell on FlourShop</Link></li>
            <li><Link to="/affiliate">Become an Affiliate</Link></li>
            <li><Link to="/advertise">Advertise Your Products</Link></li>
            <li><Link to="/self-publish">Self-Publish with Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Payment Products</h3>
          <ul>
            <li><Link to="/business">Business Card</Link></li>
            <li><Link to="/shop">Shop with Points</Link></li>
            <li><Link to="/reload">Reload Your Balance</Link></li>
            <li><Link to="/currency">Currency Converter</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Let Us Help You</h3>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/help">Help</Link></li>
            <li><Link to="/shipping">Shipping & Delivery</Link></li>
            <li><Link to="/returns">Returns & Replacements</Link></li>
            <li><Link to="/track">Track Your Order</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-logo">
            <Link to="/">🛒 FlourShop</Link>
          </div>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms of Use</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/cookies">Cookie Preferences</Link>
            <Link to="/ads">Interest-Based Ads</Link>
            <Link to="/conditions">Conditions of Use</Link>
            <Link to="/notice">Notice at Collection</Link>
            <Link to="/help">Help</Link>
          </div>
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} FlourShop.com, Inc. or its affiliates</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
