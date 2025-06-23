import React from "react";
import "./AmazonStyle.css";

const Footer = () => (
  <footer className="amazon-footer">
    <p>&copy; {new Date().getFullYear()} FlourShop • All rights reserved.</p>
    <div className="footer-links">
      <a href="/">Terms</a>
      <a href="/">Privacy</a>
      <a href="/">Help</a>
    </div>
  </footer>
);

export default Footer;
