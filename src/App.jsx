import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./components/AmazonStyle.css";
import SearchBar from "./components/SearchBar";
import CartPage from "./components/CartPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import { CartProvider } from "./context/CartContext";
import "./styles/main.css";

const App = () => (
  <CartProvider>
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/about" element={<AboutPage />} />    
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  </CartProvider>
);

export default App;
