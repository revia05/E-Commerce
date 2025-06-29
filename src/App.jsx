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
import OrdersPage from "./components/OrdersPage";
import CheckoutPage from "./components/CheckoutPage";
import ProductDetailsPage from "./components/ProductDetailsPage";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { OrdersProvider } from "./context/OrdersContext";

import "./styles/main.css";

const App = () => (
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <OrdersProvider>
          <Router>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<SearchBar />} />
                <Route path="/product/:productId" element={<ProductDetailsPage />} />
                <Route path="/about" element={<AboutPage />} />    
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </OrdersProvider>
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>
);

export default App;
