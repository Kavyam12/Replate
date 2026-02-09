import React, { useState } from 'react'
import './FoodListing.css'
import {  mockRecentFood } from '../data/mockdata.js';
import springconfig from '../api/api.js';
import axios from 'axios';
import { useEffect } from 'react';


const FoodListing = () => {

  const [formdata, setFormData] = useState({
    foodName: "",
    quantity: "",
    price: "",
    deadline: "",
    imageFile: null,
    imagepreview: ""
  });

  const [recentFood, setRecentFood] = useState([]);

  useEffect(() => {
    

    fetchFoodListings();
  }, [])

  const fetchFoodListings = async () => {
      try{
        const resp = await springconfig.get("/donor/food-listings");
        setRecentFood(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.error("Failed to fetch the food listings", error);
      }
    };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formdata.foodName || !formdata.deadline || !formdata.price || !formdata.quantity) {
      alert("All fields are required");
      return
    }

    if(!formdata.imageFile) {
      alert("Image upload is mandatory");
      return;
    }

    
    const backendPayload = new FormData();

    backendPayload.append("foodName", formdata.foodName);
    backendPayload.append("quantity", formdata.quantity);
    backendPayload.append("price", formdata.price);
    backendPayload.append("deadline", formdata.deadline);
    backendPayload.append("imageFile", formdata.imageFile);
    try{ 
    

          await springconfig.post("/donor/food-listings", backendPayload);

          await fetchFoodListings();


          setFormData({
            foodName: "",
            quantity: "",
            price: "",
            deadline: "",
            imageFile: null,
            imagepreview: ""
        })
      } catch (error) {
        console.error("Failed to create the food listing", error);
        alert("Failed to list the food, Please try again");
      }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(p => ({
      ...p,
      [name]: value
    }));
  };
  return (
    <div className="foodListing-container">

      <div className="food-header">
        <h1>List Excess Food</h1>
        <p>Add food items that are available for purchase by NGOs</p>
      </div>

      <div className="food-form-container">

        <div className="form-header">
          <h3>Add New Food Item</h3>
        </div>


        <form className='food-form' onSubmit={handleSubmit}>

          <div className="input-field">
            <label htmlFor="foodName">Food Name</label>
            <input
              type="text"
              name='foodName'
              id='foodName'
              className='input-name'
              placeholder='e.g., RedHot Fried Rice'
              value={formdata.foodName}
              onChange={handleChange}
              autoComplete='off'
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="image">Item Image</label>
            <input
              type="file"
              accept='image/*'
              name='image'
              id='image'
              className='input-name'
              autoComplete='off'
              onChange={(e) => {
                const file = e.target.files[0];

                if (!file){
                  return;
                }

                setFormData (p => ({
                  ...p,
                  imageFile: file,
                  imagepreview: URL.createObjectURL(file)
                }))
              }}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="foodQuantity">Quantity</label>
            <input
              type="number"
              id='foodQuantity'
              name='quantity'
              className='input-quantity'
              placeholder='e.g., 5 or 10'
              value={formdata.quantity}
              onChange={handleChange}
              autoComplete='off'
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="foodprice">Price (₹)</label>
            <input
              type="number"
              name='price'
              id='foodprice'
              className='input-price'
              placeholder='e.g., ₹120'
              value={formdata.price}
              onChange={handleChange}
              autoComplete='off'
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="foodDeadline">Pickup Deadline</label>
            <input
              type="datetime-local"
              id='foodDeadline'
              name='deadline'
              className='input-deadline'
              placeholder='dd/mm/yyyy, --:-- --'
              value={formdata.deadline}
              onChange={handleChange}
              autoComplete='off'
              required
            />
          </div>

          <div className="submit-btn">
            <button className="submit">
              + List Food Item
            </button>
          </div>

        </form>

      </div>

        <div className="food-list-section">

          <div className="food-list-section-header">
            <h3>Listed Food Items</h3>
          </div>

            <table className="food-table">
              <thead>
                <tr>
                  <th>Food Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Pickup Deadline</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentFood.map (food => (
                  <tr key={`${food.foodName}-${food.deadline}`}>

                    <td>
                      <div className="food-image">
                        <img src={`http://localhost:8080${food.image}?v=${Date.now()}`} alt={food.foodName} />
                        <span>{food.foodName}</span>
                      </div>
                    </td>

                    <td>
                      {food.quantity}
                    </td>

                    <td>
                      {food.price}
                    </td>

                    <td>
                      {food.deadline}
                    </td>

                    <td>
                      <span className={`status-badge ${food.status.toLowerCase()}`}>
                        {food.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      
    </div>
  )
}

export default FoodListing