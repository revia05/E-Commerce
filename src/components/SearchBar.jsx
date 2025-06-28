import React, { useState } from "react";
import { dummyProducts } from "../data/dummyProducts";
import ProductCard from "./ProductCard";
import Carousel from "./Carousel";
import "../styles/main.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const filteredProducts = query
    ? dummyProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    : dummyProducts;

  return (
    <div className="search-container">
      <input
        id="rem"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search flour products..."
      />

      <Carousel />

      <h2 style={{ marginTop: "30px" }}>
        {query ? "Search Results:" : "All Products"}
      </h2>

      {filteredProducts.length > 0 ? (
        <div className="results-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="no-results">No matching products found.</p>
      )}
    </div>
  );
};

export default SearchBar;
