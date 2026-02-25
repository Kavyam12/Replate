import React, { useState, useEffect, use } from "react";
import { ShoppingCart, Search, Filter } from "lucide-react";
import "./NgoDashboard.css";
import api from "../api/api";

const NgoDashboard = () => {
  const [foodListings, setFoodListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState("NONE");

  useEffect(() => {
    fetchFoodListings();
  }, []);

  const fetchFoodListings = async () => {
    try {
      const response = await api.get("/ngo/available-food");
      setFoodListings(response.data);
    } catch (error) {
      console.error("Failed to fetch food listings", error);
      setFoodListings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (id, value, max) => {
    const parsed = parseInt(value);
    const qty = Math.max(1, Math.min(parsed || 1, max));

    setQuantities((prev) => ({
      ...prev,
      [id]: qty,
    }));
  };

  const addToCart = async (food) => {
    const qty = quantities[food.id] || 1;

    try {
      await api.post(`/cart/add?listingId=${food.id}&qty=${qty}`);

      console.log("Added to cart:", food.id, qty);

      alert(`${qty} ${food.foodName} added to cart`);

      // Reset quantity selector
      setQuantities((prev) => ({ ...prev, [food.id]: 1 }));
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };

  const getImageUrl = (imagePath) => {

    if (!imagePath)
      return "https://via.placeholder.com/300x200?text=No+Image";

    if (imagePath.startsWith("http"))
      return imagePath;

    return `http://localhost:8080${imagePath}`;
  };

  const filteredListings = [...foodListings]
    .filter(food =>
      food.foodName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (priceSort === "LOW_TO_HIGH") return a.price - b.price;
      if (priceSort === "HIGH_TO_LOW") return b.price - a.price;
      return 0;
    });

  return (
    <div className="ngo-dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Available Food Listings</h1>
          <p>Browse and purchase surplus food from partner restaurants</p>
        </div>

        <div className="search-filter-container">
          <div className="search-bar">
            <Search size={18} color="#95a5a6" />
            <input
              type="text"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="filter-dropdown"
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
          >
            <option value="NONE">Filter</option>
            <option value="LOW_TO_HIGH">Price: Low → High</option>
            <option value="HIGH_TO_LOW">Price: High → Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading listings...</div>
      ) : (
        <div className="listings-grid">
          {filteredListings.map((food) => {
            const selectedQty = quantities[food.id] || 1;

            return (
              <div key={food.id} className="food-card">
                <div className="food-card-image">
                  <img src={getImageUrl(food.image)} alt={food.foodName} />
                  <span className="restaurant-badge">
                    {food.restaurantName}
                  </span>
                </div>

                <div className="food-card-content">
                  <div className="food-header">
                    <h3>{food.foodName}</h3>
                    <span className="price">₹{food.price}</span>
                  </div>

                  <div className="food-details">
                    <div className="detail-item">
                      <span className="label">Available:</span>
                      <span className="value">
                        {food.quantity} units
                      </span>
                    </div>

                    <div className="detail-item">
                      <span className="label">Deadline:</span>
                      <span className="value">
                        {new Date(food.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <div className="quantity-selector">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            food.id,
                            selectedQty - 1,
                            food.quantity
                          )
                        }
                        disabled={selectedQty <= 1}
                      >
                        -
                      </button>

                      <input
                        type="number"
                        value={selectedQty}
                        onChange={(e) =>
                          handleQuantityChange(
                            food.id,
                            e.target.value,
                            food.quantity
                          )
                        }
                        min="1"
                        max={food.quantity}
                      />

                      <button
                        onClick={() =>
                          handleQuantityChange(
                            food.id,
                            selectedQty + 1,
                            food.quantity
                          )
                        }
                        disabled={selectedQty >= food.quantity}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="btn-add-cart"
                      onClick={() => addToCart(food)}
                    >
                      <ShoppingCart size={18} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NgoDashboard;