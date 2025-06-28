import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart items from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('flourshop-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('flourshop-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Always increase quantity for existing products
  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    ));
  };

  const decreaseQuantity = (productId) => {
    setCartItems(cartItems.map(item =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
