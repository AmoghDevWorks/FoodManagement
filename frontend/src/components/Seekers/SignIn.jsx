import React from 'react';

const SignIn = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center overflow-x-hidden px-4">
      <div className="bg-slate-800 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">Sign In</h1>

        <div className="mb-4">
          <label htmlFor="email" className="text-yellow-400 font-semibold text-lg block mb-1">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="text-yellow-400 font-semibold text-lg block mb-1">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className="w-full p-3 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button className="w-full bg-yellow-400 text-slate-900 font-bold py-2 rounded-lg hover:bg-yellow-300 transition duration-200">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
