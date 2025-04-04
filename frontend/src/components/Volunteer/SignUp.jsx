import React from 'react';

const VolunteerSignUp = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center overflow-x-hidden px-4">
      <div className="bg-slate-800 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 rounded-xl shadow-lg">
        <h1 className="text-5xl font-extrabold text-yellow-400 mb-6 tracking-wide text-center">Sign Up</h1>

        {[
          { id: 'name', label: 'Name', type: 'text', placeholder: 'Your Full Name' },
          { id: 'email', label: 'Email', type: 'email', placeholder: 'Your Email' },
          { id: 'aadhar', label: 'Aadhar Number', type: 'text', placeholder: 'Aadhar Card Number' },
          { id: 'contact', label: 'Contact Number', type: 'text', placeholder: 'Phone Number' },
          { id: 'password', label: 'Password', type: 'password', placeholder: 'Create a Password' },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id} className="mb-4">
            <label htmlFor={id} className="text-yellow-400 font-semibold text-lg block mb-1">
              {label}:
            </label>
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              className="w-full p-3 rounded-md bg-slate-700 text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
            />
          </div>
        ))}

        <button className="w-full mt-6 bg-yellow-400 text-slate-900 font-bold py-2 rounded-lg hover:bg-yellow-300 transition duration-200">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default VolunteerSignUp;
