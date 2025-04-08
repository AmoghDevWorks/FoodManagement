import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios"

const AllFood = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:5000/get-food')
    .then(res=>{
      alert('fectched food')
      console.log(res)
      setFoods(res.data.food)
    })
    .catch(e=>{
      alert('error from food')
    })

  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-center text-slate-100 mb-8">
        Available Food
      </h1>

      <div className="flex items-center justify-center flex-wrap w-[85%]">
        {foods.map((food) => (
          <div
            key={food._id}
            className="w-72 h-80 m-8 p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg"
          >
            <img
              src={`http://localhost:5000/${food.foodImage}`}
              alt={food.name}
              className="w-full h-48 object-contain  rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold text-yellow-400 capitalize">{food.name}</h2>
            <p className="text-lg text-slate-300">
              💰 <span className="line-through text-slate-400">₹{food.rate}</span> <span className="text-green-400">(Free)</span>
            </p>
            <div className="flex items-center text-yellow-400 text-lg mt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar key={index} className={index < Math.round(food.rating) ? "text-yellow-400" : "text-slate-500"} />
              ))}
              <span className="text-slate-300 ml-2">({food.rating})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFood;
