import React from "react";
import { FaMedal, FaStar, FaFire, FaCoins, FaTrophy, FaCalendarAlt } from "react-icons/fa";

const Dashboard = () => {
  const donor = {
    name: "John Doe",
    streak: 5,
    weeklyStreak: [true, true, true, false, true, false, false], // Mon to Sun
    totalDonations: 250,
    coins: 2500,
    averageRating: 4.6,
    level: 8,
    xp: 75,
  };

  const getTier = (donations) => {
    if (donations >= 200) return "Diamond";
    if (donations >= 150) return "Platinum";
    if (donations >= 100) return "Gold";
    if (donations >= 50) return "Silver";
    return "Bronze";
  };

  const tier = getTier(donor.totalDonations);
  
  const tierStyles = {
    Bronze: { bg: "bg-yellow-700", text: "text-yellow-300", border: "border-yellow-700" },
    Silver: { bg: "bg-slate-400", text: "text-slate-100", border: "border-slate-400" },
    Gold: { bg: "bg-yellow-500", text: "text-yellow-100", border: "border-yellow-500" },
    Platinum: { bg: "bg-slate-300", text: "text-slate-800", border: "border-slate-300" },
    Diamond: { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-100" },
  };

  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="min-h-screen bg-slate-800 text-white p-6">
      <div className="max-w-6xl mx-auto bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-700">
        <h1 className="text-4xl font-extrabold mb-8 tracking-wide text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400">
          Welcome, {donor.name} 👋
        </h1>
        
        {/* Parent Grid Container */}
        <div className="flex flex-col gap-6 items-center w-full">
          {/* Streak Container - Takes 80% Width */}
          <div className="w-full md:w-4/5 bg-slate-800 border border-slate-700 rounded-xl p-6 flex items-center hover:border-yellow-300 transition-all">
            <div className="px-5"> 
                <h2 className="text-xl text-center font-semibold text-slate-200 mb-3">Current Streak</h2>
                <div className="flex items-center gap-2 mb-2 justify-center">
                    <FaFire className="text-yellow-400 text-4xl" />
                    <span className="text-yellow-300 text-4xl font-bold">{donor.streak}</span>
                </div>
            </div>
            
            {/* Weekly streak calendar */}
            <div className="flex flex-col items-center justify-center gap-1 w-full mb-2">
                <p className="text-slate-400 text-md my-4">
                    <FaCalendarAlt className="inline mr-1 mb-1" /> This Week
                </p>
                <div className="flex gap-3">
                    {days.map((day, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <span className="text-xs text-slate-400 mb-1">{day}</span>
                            <div 
                                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                donor.weeklyStreak[index] 
                                    ? "bg-yellow-400 text-slate-900" 
                                    : "bg-slate-700 text-slate-500"
                                }`}
                            >
                                {donor.weeklyStreak[index] ? "✓" : ""}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Grid for Other Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Tier Card */}
            <div className={`${tierStyles[tier].bg} rounded-xl p-6 flex flex-col items-center shadow-lg ${tierStyles[tier].border}`}>
              <FaMedal className="text-white text-5xl mb-3 opacity-90" />
              <h2 className="text-xl font-semibold text-white">Tier</h2>
              <p className={`${tierStyles[tier].text} text-4xl font-bold mt-2`}>{tier}</p>
            </div>
            
            {/* Coins */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col items-center hover:border-yellow-300 transition-all relative">
              <div className="absolute top-2 right-2 text-xs bg-yellow-400 px-2 py-1 rounded-full text-slate-900 font-bold">
                +150 Today
              </div>
              <FaCoins className="text-yellow-400 text-5xl mb-3" />
              <h2 className="text-xl font-semibold text-slate-200">Coins Earned</h2>
              <p className="text-yellow-300 text-4xl font-bold mt-2">{donor.coins}</p>
            </div>
            
            {/* Average Rating */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col items-center hover:border-yellow-300 transition-all">
              <FaStar className="text-yellow-400 text-5xl mb-3" />
              <h2 className="text-xl font-semibold text-slate-200">Average Rating</h2>
              <p className="text-yellow-300 text-4xl font-bold mt-2">{donor.averageRating} ⭐</p>
            </div>
          </div>
        </div>
        
        {/* Achievements Section */}
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold mb-6 text-yellow-300 flex items-center justify-center gap-2">
            <FaTrophy className="text-yellow-400" /> Achievements
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="bg-slate-800 border border-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full font-medium hover:bg-yellow-400/10 transition-colors">
              🔥 Streak Master
            </div>
            <div className="bg-slate-800 border border-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full font-medium hover:bg-yellow-400/10 transition-colors">
              💎 Diamond Donor
            </div>
            <div className="bg-slate-800 border border-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full font-medium hover:bg-yellow-400/10 transition-colors">
              🌟 Community Hero
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
