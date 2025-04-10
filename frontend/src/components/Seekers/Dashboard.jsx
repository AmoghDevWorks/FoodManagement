import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useSelector } from 'react-redux'

const Dashboard = () => {

  // havent set dynamic content bcz i want to keep track of orders for that

  const [ userData,setUserData ] = useState(null)
  const email = useSelector((state)=>state.user.value.email)

  useEffect(()=>{
    axios.get(`http://localhost:5000/get-seeker-data/${email}`)
    .then((res)=>{
      console.log(res)
    }).catch(e=>{
      console.log(e)
    })
  },[])

  // Example Seeker Data (Replace with real data)
  const seeker = {
    name: "Amit Kumar",
    location: "Mumbai",
    contact: "amitk@example.com",
    previousFood: ["Dal & Rice", "Vegetable Pulao", "Chapati & Paneer"],
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex items-center justify-center p-8">
      <div className="max-w-lg w-full bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-700">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-slate-100">
          Food Seeker Dashboard
        </h1>

        {/* User Info */}
        <div className="p-6 rounded-lg shadow-lg bg-slate-700 border border-slate-600">
          <h2 className="text-3xl font-bold text-slate-100">{seeker.name}</h2>
          <p className="text-lg text-slate-400 mt-2">📍 {seeker.location}</p>
          <p className="text-lg text-slate-400">📞 {seeker.contact}</p>
        </div>

        {/* Previous Food Details */}
        <h3 className="text-2xl font-semibold mt-6 text-yellow-400">
          🍽️ Last 3 Meals Received
        </h3>
        <ul className="mt-3 text-lg text-slate-200 list-disc ml-6">
          {seeker.previousFood.map((food, index) => (
            <li key={index} className="border-b border-slate-600 py-2">{food}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
