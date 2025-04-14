import React, { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useSelector } from 'react-redux'

const AllFood = () => {
  const [foods, setFoods] = useState([]);
  const quantityRefs = useRef({}); // Store user-selected quantities per foodId
  const seekerId = useSelector((state)=>state.user.value.id)

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-food")
      .then((res) => {
        alert("Fetched food");
        setFoods(res.data.food);

        // Initialize all quantity refs to 0
        const initialQuantities = {};
        res.data.food.forEach((food) => {
          initialQuantities[food._id] = 0;
        });
        quantityRefs.current = initialQuantities;
      })
      .catch(() => {
        alert("Error fetching food");
      });
  }, []);

  const handleIncrement = (foodId, availableQty) => {
    if (quantityRefs.current[foodId] < availableQty) {
      quantityRefs.current[foodId] += 1;
      forceUpdate(); // To trigger re-render
    }
  };

  const handleDecrement = (foodId) => {
    if (quantityRefs.current[foodId] > 0) {
      quantityRefs.current[foodId] -= 1;
      forceUpdate(); // To trigger re-render
    }
  };

  const handleAddToCart = (foodId) => {
    const qty = quantityRefs.current[foodId];
    if (qty < 1) {
      alert("Please select at least 1 item.");
      return;
    }
  
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        axios
          .post("http://localhost:5000/add-to-cart", {
            foodId,
            quantity: qty,
            seekerId,
            latitude,
            longitude,
          })
          .then((res) => {
            alert("Food item added to cart successfully!");
          })
          .catch((err) => {
            console.error("Error adding to cart:", err);
            alert("Failed to add item to cart.");
          });
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to get your location.");
      }
    );
  };
  

  const [, setRerender] = useState(false);
  const forceUpdate = () => setRerender((prev) => !prev);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col items-center p-6">
      <h1 className="text-5xl font-extrabold text-center text-slate-100 mb-8">
        Available Food
      </h1>

      <div className="flex items-center justify-center flex-wrap w-[85%]">
        {foods.map((food) => (
          <div
            key={food._id}
            className="w-80 h-auto m-8 p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg flex flex-col items-center"
          >
            <img
              src={`http://localhost:5000/${food.foodImage}`}
              alt={food.name}
              className="w-full h-48 object-contain rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold text-yellow-400 capitalize">
              {food.name}
            </h2>
            <p className="text-md text-slate-300 mt-1">
              Available Quantity:{" "}
              <span className="text-green-400 font-bold">
                {food.quantity}
              </span>
            </p>
            <p className="text-lg text-slate-300">
              💰 <span className="line-through text-slate-400">₹{food.rate}</span>{" "}
              <span className="text-green-400">(Free)</span>
            </p>
            <div className="flex items-center text-yellow-400 text-lg mt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < Math.round(food.rating)
                      ? "text-yellow-400"
                      : "text-slate-500"
                  }
                />
              ))}
              <span className="text-slate-300 ml-2">({food.rating})</span>
            </div>

            {/* Quantity control */}
            <div className="flex items-center mt-4">
              <button
                onClick={() => handleDecrement(food._id)}
                className="bg-yellow-400 text-slate-900 font-bold py-1 px-3 rounded-lg"
              >
                -
              </button>
              <span className="mx-4 text-xl text-slate-300">
                {quantityRefs.current[food._id] || 0}
              </span>
              <button
                onClick={() => handleIncrement(food._id, food.quantity)}
                className="bg-yellow-400 text-slate-900 font-bold py-1 px-3 rounded-lg"
              >
                +
              </button>
            </div>

            {/* Add to cart button */}
            <button
              onClick={() => handleAddToCart(food._id)}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-2 px-4 rounded-lg mt-4"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFood;
