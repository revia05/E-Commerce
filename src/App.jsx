import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./components/AmazonStyle.css";
import SearchBar from "./components/SearchBar";
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import "./styles/main.css";

const App = () => (
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<SearchBar />} />
              <Route path="/about" element={<AboutPage />} />    
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>
);

export default App;

