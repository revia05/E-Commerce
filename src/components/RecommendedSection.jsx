import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import "../styles/main.css";
import "./AmazonStyle.css";

const RecommendedSection = () => {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const clickedProductIds = JSON.parse(localStorage.getItem("userClickedProducts") || "[]");
    const API_URL = import.meta.env.VITE_BACKEND_URL;

    // ⛔ Don't fetch if nothing in localStorage
    if (clickedProductIds.length === 0) {
      setLoading(false);
      return;
    }
  
    /*const fetchRecommendations = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recommend-multi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_ids: clickedProductIds }),
        });

        const data = await res.json();
        setRecommended(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };*/
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`${API_URL}/api/recommend-multi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_ids: clickedProductIds }),
        });
    
        const data = await res.json();
        setRecommended(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);


  return (
    <div className="recommended-section">
      <h2>Recommended For You</h2>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : recommended.length > 0 ? (
        <div className="results-grid">
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No recommendations found. Add some items to your cart or wishlist to get suggestions!</p>
      )}
    </div>
  );
};

export default RecommendedSection;
