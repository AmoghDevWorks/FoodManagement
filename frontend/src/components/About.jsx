import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-6">
      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-yellow-400 mb-6 tracking-wide">About Us</h1>

      {/* Introduction Text */}
      <p className="text-lg text-gray-300 max-w-3xl text-center leading-relaxed">
        Every year, tons of food go to waste while millions struggle with hunger. 
        We believe no meal should be wasted when someone is in need. Our platform 
        bridges generous donors with those who require food the most.
      </p>

      {/* Features Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl text-center">
        <div className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
          <p className="text-yellow-300 text-2xl font-semibold">🍽️ Donate Excess Food</p>
          <p className="text-gray-400 mt-2">
            Whether you're an individual, restaurant, or organization with surplus food, 
            our platform makes it easy to share your extra meals with those in need.
          </p>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
          <p className="text-yellow-300 text-2xl font-semibold">🚚 Easy Connections</p>
          <p className="text-gray-400 mt-2">
            We connect food donors directly with NGOs, shelters, and individuals, 
            ensuring food reaches the right hands before it goes to waste.
          </p>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
          <p className="text-yellow-300 text-2xl font-semibold">🤝 Fighting Hunger Together</p>
          <p className="text-gray-400 mt-2">
            Our mission is to build a community where food is shared responsibly, 
            reducing waste and ensuring everyone gets a meal.
          </p>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition">
          <p className="text-yellow-300 text-2xl font-semibold">🌍 Sustainable Impact</p>
          <p className="text-gray-400 mt-2">
            Food wastage contributes to environmental issues. By donating, you're 
            not only feeding the hungry but also helping create a sustainable future.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <p className="mt-10 text-gray-400 max-w-2xl text-center text-lg leading-relaxed">
        Whether you’re a donor with extra food or someone looking for a meal, 
        we make the process simple, fast, and reliable. Join us in creating a world where 
        food is shared with kindness, not wasted.
      </p>

      <button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-semibold text-lg transition">
        Join the Movement
      </button>
    </div>
  );
};

export default About;
