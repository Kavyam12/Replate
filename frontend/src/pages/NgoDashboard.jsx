// import React, { useState, useEffect } from 'react';
// import { ShoppingCart, Search, Filter } from 'lucide-react';
// import './NgoDashboard.css';
// import api from '../api/api';

// const NgoDashboard = () => {
//   const [foodListings, setFoodListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [quantities, setQuantities] = useState({});

//   useEffect(() => {
//     fetchFoodListings();
//   }, []);

//   const fetchFoodListings = async () => {
//     try {
//       const response = await api.get('/ngo/availableFood');
//       setFoodListings(response.data);
//     } catch (error) {
//       console.error("Failed to fetch food listings", error);
//       setFoodListings([
//         { id: 1, foodName: 'Chicken Biryani', restaurantName: 'Spice Garden', price: 150, quantity: 20, imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=60', deadline: '2024-03-20T18:00:00' },
//         { id: 2, foodName: 'Veg Thali', restaurantName: 'Green Leaf', price: 80, quantity: 15, imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60', deadline: '2024-03-20T20:00:00' },
//         { id: 3, foodName: 'Pasta Alfredo', restaurantName: 'Italiano', price: 120, quantity: 10, imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&auto=format&fit=crop&q=60', deadline: '2024-03-21T12:00:00' },
//         { id: 4, foodName: 'Paneer Butter Masala', restaurantName: 'Curry House', price: 180, quantity: 25, imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60', deadline: '2024-03-21T15:00:00' },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuantityChange = (id, value, max) => {
//     const qty = Math.max(1, Math.min(parseInt(value) || 0, max));
//     setQuantities(prev => ({
//       ...prev,
//       [id]: qty
//     }));
//   };

//   const addToCart = (food) => {
//     const qty = quantities[food.id] || 1;
//     const cartItem = {
//       ...food,
//       selectedQuantity: qty
//     };

//     // Get existing cart from local storage
//     const existingCart = JSON.parse(localStorage.getItem('ngoCart')) || [];

//     // Check if item already exists
//     const existingItemIndex = existingCart.findIndex(item => item.id === food.id);

//     if (existingItemIndex > -1) {
//       existingCart[existingItemIndex].selectedQuantity += qty;
//     } else {
//       existingCart.push(cartItem);
//     }

//     localStorage.setItem('ngoCart', JSON.stringify(existingCart));
//     alert(`${qty} ${food.foodName} added to cart!`);

//     // Reset quantity input
//     setQuantities(prev => ({ ...prev, [food.id]: 1 }));
//   };

//   return (
//     <div className="ngo-dashboard-container">
//       <div className="dashboard-header">
//         <div>
//           <h1>Available Food Listings</h1>
//           <p>Browse and purchase surplus food from partner restaurants</p>
//         </div>
//         <div className="search-filter-container">
//           <div className="search-bar">
//             <Search size={18} color="#95a5a6" />
//             <input type="text" placeholder="Search food..." />
//           </div>
//           <button className="filter-btn">
//             <Filter size={18} />
//             Filter
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="loading">Loading listings...</div>
//       ) : (
//         <div className="listings-grid">
//           {foodListings.map(food => (
//             <div key={food.id} className="food-card">
//               <div className="food-card-image">
//                 <img src={food.imageUrl} alt={food.foodName} />
//                 <span className="restaurant-badge">{food.restaurantName}</span>
//               </div>

//               <div className="food-card-content">
//                 <div className="food-header">
//                   <h3>{food.foodName}</h3>
//                   <span className="price">₹{food.price}</span>
//                 </div>

//                 <div className="food-details">
//                   <div className="detail-item">
//                     <span className="label">Available:</span>
//                     <span className="value">{food.quantity} units</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="label">Deadline:</span>
//                     <span className="value">{new Date(food.deadline).toLocaleDateString()}</span>
//                   </div>
//                 </div>

//                 <div className="card-actions">
//                   <div className="quantity-selector">
//                     <button
//                       onClick={() => handleQuantityChange(food.id, (quantities[food.id] || 1) - 1, food.quantity)}
//                       disabled={(quantities[food.id] || 1) <= 1}
//                     >-</button>
//                     <input
//                       type="number"
//                       value={quantities[food.id] || 1}
//                       onChange={(e) => handleQuantityChange(food.id, e.target.value, food.quantity)}
//                       min="1"
//                       max={food.quantity}
//                     />
//                     <button
//                       onClick={() => handleQuantityChange(food.id, (quantities[food.id] || 1) + 1, food.quantity)}
//                       disabled={(quantities[food.id] || 1) >= food.quantity}
//                     >+</button>
//                   </div>

//                   <button className="btn-add-cart" onClick={() => addToCart(food)}>
//                     <ShoppingCart size={18} />
//                     Add
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NgoDashboard;


import React, { useState, useEffect } from "react";
import { ShoppingCart, Search, Filter } from "lucide-react";
import "./NgoDashboard.css";
import api from "../api/api";

const NgoDashboard = () => {
  const [foodListings, setFoodListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

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
            <input type="text" placeholder="Search food..." />
          </div>

          <button className="filter-btn">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading listings...</div>
      ) : (
        <div className="listings-grid">
          {foodListings.map((food) => {
            const selectedQty = quantities[food.id] || 1;

            return (
              <div key={food.id} className="food-card">
                <div className="food-card-image">
                  <img src={getImageUrl(food.imageUrl)} alt={food.foodName} />
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