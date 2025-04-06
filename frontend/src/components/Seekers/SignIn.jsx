import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../utils/userSlice';
import { setType } from '../../utils/typeSlice';
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const fields = [
    { id: 'email', type: 'email', label: 'Email', placeholder: 'Your Email' },
    { id: 'password', type: 'password', label: 'Password', placeholder: 'Your Password' }
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = () => {
    axios.post('http://localhost:5000/signin-seeker', formData)
      .then((res) => {
        if (res.status === 200) {
          alert('success')

          dispatch(setUser(res.data.user));
          dispatch(setType({type:"seeker"}));
          navigate('/'); 
        }
      })
      .catch((err) => {
        console.error('Login error:', err);
        alert('Invalid credentials or internal server error.');
      });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center overflow-x-hidden px-4">
      <div className="bg-slate-800 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">Sign In as Seeker</h1>

        {fields.map(({ id, type, label, placeholder }) => (
          <div key={id} className="mb-4">
            <label htmlFor={id} className="text-yellow-400 font-semibold text-lg block mb-1">
              {label}:
            </label>
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              value={formData[id]}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        ))}

        <button
          className="w-full bg-yellow-400 text-slate-900 font-bold py-2 rounded-lg hover:bg-yellow-300 transition duration-200"
          onClick={handleSubmit}
        >
          Sign In
        </button>

        <div className="mt-6 text-center p-4 border border-slate-700 rounded-lg">
          <p className="text-slate-300">
            Don't have an account?{' '}
            <span onClick={() => navigate('/seekers-signup')} className="text-yellow-400 font-bold cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
