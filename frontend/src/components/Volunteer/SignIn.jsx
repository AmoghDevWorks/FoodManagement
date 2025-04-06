import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../utils/userSlice';
import { setType } from '../../utils/typeSlice';
import axios from 'axios';

const VolunteerSignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleClick = () =>{
    axios.post('http://localhost:5000/signin-volunteer',formData)
    .then(res=>{
      alert('success')

      dispatch(setUser(res.data.user))
      dispatch(setType({type:"volunteer"}))

      navigate('/')
     })
    .catch(e=>{
      console.log(e)
    })
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center overflow-x-hidden px-4">
      <div className="bg-slate-800 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-6 tracking-wide text-center">Sign In as Volunteer</h1>

        {[
          { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
          { id: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id} className="mb-5">
            <label htmlFor={id} className="text-yellow-400 font-semibold text-lg block mb-1">
              {label}:
            </label>
            <input
              id={id}
              type={type}
              value={formData[id]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full p-3 rounded-md bg-slate-700 text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
            />
          </div>
        ))}

        <button
          className="w-full mt-6 bg-yellow-400 text-slate-900 font-bold py-2 rounded-lg hover:bg-yellow-300 transition duration-200"
          onClick={handleClick}
        >
          Sign In
        </button>

        <div className="mt-6 text-center p-4 border border-slate-700 rounded-lg">
          <p className="text-slate-300">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/volunteer-signup')}
              className="text-yellow-400 font-bold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerSignIn;
