import React, { useEffect, useState } from "react";
import { FaStar, FaMedal, FaFire } from "react-icons/fa";

const Dashboard = () => {
  const [volunteer, setVolunteer] = useState(null);
  
  useEffect(() => {
    // Temporary mock data (replace with API call)
    setVolunteer({
      name: "Rahul Sharma",
      vechicleType: "Bike",
      phone: "+91 98765 43210",
      adress: "MG Road, Bangalore",
      rating: 3.5,
      weeklyStreak: [true, true, false, true, false, true, true], // Streak for 7 days
      overallStreak: {
        current: 3,
        best: 14,
        totalDays: 42
      }
    });
  }, []);

  if (!volunteer) {
    return <div className="text-center text-slate-300 text-xl">Loading...</div>;
  }

  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const tier = volunteer.rating >= 4.5 ? "Gold" : volunteer.rating >= 3.5 ? "Silver" : "Bronze";
  const activeStreak = volunteer.weeklyStreak.filter(day => day).length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
        <h1 className="text-3xl font-extrabold text-center text-slate-100 py-4 bg-slate-700">
          Volunteer Dashboard
        </h1>

        <div className="p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Left column: Profile + Weekly Streak */}
            <div className="space-y-4">
              {/* Volunteer Info Card */}
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-100">👤 {volunteer.name}</h2>
                    <div className="mt-3 space-y-1">
                      <p className="text-slate-400">🚗 {volunteer.vechicleType}</p>
                      <p className="text-slate-400">📍 {volunteer.adress}</p>
                      <p className="text-slate-400">📞 {volunteer.phone}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`p-2 ${
                      tier === "Gold" ? "bg-yellow-500" : tier === "Silver" ? "bg-gray-400" : "bg-yellow-700"
                    } rounded-lg mb-1`}>
                      <FaMedal className="text-white text-2xl" />
                    </div>
                    <span className="text-xs font-medium text-slate-300">{tier}</span>
                  </div>
                </div>
              </div>

              {/* Weekly Streak Card */}
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-yellow-400">🔥 Weekly Streak</h2>
                  <span className="text-yellow-400 font-bold">{activeStreak}/7</span>
                </div>
                <div className="flex justify-between mb-4">
                  {days.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <span className="text-xs text-slate-400">{day}</span>
                      <div 
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          volunteer.weeklyStreak[index] ? "bg-yellow-400 text-slate-900" : "bg-slate-700 text-slate-500"
                        }`}
                      >
                        {volunteer.weeklyStreak[index] ? "✓" : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column: Rating + Overall Streak */}
            <div className="space-y-4">
              {/* Rating Card */}
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h2 className="text-xl font-semibold text-yellow-400 mb-2">⭐ Volunteer Rating</h2>
                <div className="flex items-center">
                  <div className="flex text-xl">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar key={index} className={index < Math.round(volunteer.rating) ? "text-yellow-400" : "text-slate-500"} />
                    ))}
                  </div>
                  <span className="text-slate-300 ml-2">({volunteer.rating})</span>
                </div>
              </div>

              {/* Overall Streak Card - New Addition */}
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h2 className="text-xl font-semibold text-yellow-400 mb-3">🏆 Overall Streak</h2>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-600/50 p-3 rounded-lg">
                    <div className="flex items-center justify-center text-yellow-400 mb-1">
                      <FaFire className="mr-1" />
                      <span className="text-xl font-bold">{volunteer.overallStreak.current}</span>
                    </div>
                    <div className="text-xs text-slate-400">Current</div>
                  </div>
                  <div className="bg-slate-600/50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-yellow-400 mb-1">
                      {volunteer.overallStreak.best}
                    </div>
                    <div className="text-xs text-slate-400">Best</div>
                  </div>
                  <div className="bg-slate-600/50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-yellow-400 mb-1">
                      {volunteer.overallStreak.totalDays}
                    </div>
                    <div className="text-xs text-slate-400">Total Days</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex justify-between text-sm mb-1">
                  <span>Next Tier Progress</span>
                  <span>{tier === "Gold" ? "100%" : tier === "Silver" ? "75%" : "25%"}</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${
                    tier === "Gold" ? "bg-yellow-400 w-full" : 
                    tier === "Silver" ? "bg-gray-400 w-3/4" : 
                    "bg-yellow-700 w-1/4"
                  }`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;