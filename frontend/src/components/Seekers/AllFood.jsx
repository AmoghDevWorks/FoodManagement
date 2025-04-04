import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const AllFood = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    // Mock JSON Data (Replace with API Call)
    setFoods([
        {
          "id": 1,
          "name": "Veg Biryani",
          "image": "https://tse2.mm.bing.net/th?id=OIP.LadujoU81UAUhQjy9gElUwHaHa&pid=Api&P=0&h=180",
          "price": 150,
          "donorRating": 4.7
        },
        {
          "id": 2,
          "name": "Paneer Butter Masala",
          "image": "https://tse2.mm.bing.net/th?id=OIP.3fROpInSzgY--B1msdJITQHaHa&pid=Api&P=0&h=180",
          "price": 200,
          "donorRating": 4.5
        },
        {
          "id": 3,
          "name": "Chicken Curry",
          "image": "https://source.unsplash.com/300x200/?chicken-curry",
          "price": 250,
          "donorRating": 4.8
        },
        {
          "id": 4,
          "name": "Pasta",
          "image": "https://source.unsplash.com/300x200/?pasta",
          "price": 180,
          "donorRating": 4.3
        },
        {
          "id": 5,
          "name": "Mutton Biryani",
          "image": "https://source.unsplash.com/300x200/?mutton-biryani",
          "price": 300,
          "donorRating": 4.9
        },
        {
          "id": 6,
          "name": "Samosa",
          "image": "https://source.unsplash.com/300x200/?samosa",
          "price": 50,
          "donorRating": 4.2
        },
        {
          "id": 7,
          "name": "Butter Naan with Dal Makhani",
          "image": "https://source.unsplash.com/300x200/?naan",
          "price": 220,
          "donorRating": 4.6
        },
        {
          "id": 8,
          "name": "Spring Rolls",
          "image": "https://source.unsplash.com/300x200/?spring-rolls",
          "price": 120,
          "donorRating": 4.4
        },
        {
          "id": 9,
          "name": "Tandoori Chicken",
          "image": "https://source.unsplash.com/300x200/?tandoori-chicken",
          "price": 280,
          "donorRating": 4.7
        },
        {
          "id": 10,
          "name": "Chole Bhature",
          "image": "https://source.unsplash.com/300x200/?chole-bhature",
          "price": 150,
          "donorRating": 4.5
        },
        {
          "id": 11,
          "name": "Gulab Jamun",
          "image": "https://source.unsplash.com/300x200/?gulab-jamun",
          "price": 100,
          "donorRating": 4.8
        },
        {
          "id": 12,
          "name": "Dosa with Chutney",
          "image": "https://source.unsplash.com/300x200/?dosa",
          "price": 120,
          "donorRating": 4.6
        },
        {
          "id": 13,
          "name": "Pizza",
          "image": "https://source.unsplash.com/300x200/?pizza",
          "price": 300,
          "donorRating": 4.7
        },
        {
          "id": 14,
          "name": "Pav Bhaji",
          "image": "https://source.unsplash.com/300x200/?pav-bhaji",
          "price": 140,
          "donorRating": 4.5
        }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-center text-slate-100 mb-8">
        Available Food
      </h1>

      <div className="flex items-center justify-center flex-wrap w-[85%]">
        {foods.map((food) => (
          <div
            key={food.id}
            className="w-72 h-80 m-8 p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-contain  rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold text-yellow-400">{food.name}</h2>
            <p className="text-lg text-slate-300">
              💰 <span className="line-through text-slate-400">₹{food.price}</span> <span className="text-green-400">(Free)</span>
            </p>
            <div className="flex items-center text-yellow-400 text-lg mt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar key={index} className={index < Math.round(food.donorRating) ? "text-yellow-400" : "text-slate-500"} />
              ))}
              <span className="text-slate-300 ml-2">({food.donorRating})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFood;
