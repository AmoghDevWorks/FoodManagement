import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setUser } from '../../utils/userSlice'
import { setType } from '../../utils/typeSlice'
import axios from 'axios'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleClick = () => {

    for (let key of Object.keys(formData)) {
      if (formData[key] === "") {
        alert('Fill all fields');
        return;
      }
    }

    axios.post('http://localhost:5000/signin-donor',formData)
    .then(res=>{
      alert('login successfull')

      dispatch(setUser(res.data.user))
      dispatch(setType({type:'donor'}))

      navigate('/')
    })

  };

  // Array to define fields
  const inputFields = [
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Your Email',
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Your Password',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center overflow-x-hidden px-4">
      <div className="bg-slate-800 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">Sign In as Donor</h1>

        {inputFields.map((field) => (
          <div className="mb-4" key={field.id}>
            <label htmlFor={field.id} className="text-yellow-400 font-semibold text-lg block mb-1">
              {field.label}:
            </label>
            <input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id]}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        ))}

        <button
          onClick={handleClick}
          className="w-full bg-yellow-400 text-slate-900 font-bold py-2 rounded-lg hover:bg-yellow-300 transition duration-200"
        >
          Sign In
        </button>

        <div className="mt-6 text-center p-4 border border-slate-700 rounded-lg">
          <p className="text-slate-300">
            Don't have an account?{' '}
            <span
              className="text-yellow-400 font-bold cursor-pointer hover:underline"
              onClick={() => navigate('/donor-signup')}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
