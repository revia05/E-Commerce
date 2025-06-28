import React, { useState, useRef, useEffect } from "react";
import { dummyProducts } from "../data/dummyProducts";
import ProductCard from "./ProductCard";
import Carousel from "./Carousel";
import "../styles/main.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const searchInputRef = useRef(null);

  // Check if speech recognition is supported
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
    }
  }, []);

  const filteredProducts = query
    ? dummyProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    : dummyProducts;

  const startVoiceRecognition = () => {
    if (!isSupported) {
      alert("Voice recognition is not supported in your browser");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSearch = () => {
    // Trigger search functionality if needed
    searchInputRef.current?.focus();
  };

  return (
    <div className="search-container">
      <div className="search-bar-wrapper">
        <div className="search-input-container">
          <svg 
            className="search-icon" 
            onClick={handleSearch}
            width="20" 
            height="20" 
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
          
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search flour products..."
            className="search-input"
          />
          
          {isSupported && (
            <button
              className={`voice-button ${isListening ? 'listening' : ''}`}
              onClick={startVoiceRecognition}
              title="Voice Search"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>
          )}
        </div>
        
        {isListening && (
          <div className="voice-indicator">
            <div className="voice-pulse"></div>
            <span>Listening...</span>
          </div>
        )}
      </div>

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

