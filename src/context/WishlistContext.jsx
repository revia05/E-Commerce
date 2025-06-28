import React, { createContext, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    const exists = wishlistItems.find((item) => item.id === product.id);
    if (exists) {
      // Remove from wishlist if already exists
      setWishlistItems(wishlistItems.filter((item) => item.id !== product.id));
    } else {
      // Add to wishlist
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId));
  };

  const moveToCart = (product) => {
    // Remove from wishlist and add to cart
    removeFromWishlist(product.id);
    return product; // Return product to be added to cart
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlistItems, 
        addToWishlist, 
        removeFromWishlist, 
        moveToCart, 
        isInWishlist 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}; 