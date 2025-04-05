import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../utils/userSlice'
import { setType } from '../../utils/typeSlice'

const SignUp = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ formData,setFormData ] = useState({
    name:"",
    email:"",
    password:"",
    contact:"",
    aadhar:"",
    address:"",
  })

  const handleClick = () =>{

    for (let key of Object.keys(formData)) {
      if (formData[key] === "") {
        alert('Fill all fields');
        return;
      }
    }


    axios.post('http://localhost:5000/signup-donor',formData)
    .then((res)=>{
      alert('signup successfull')
      console.log(res)
      dispatch(setUser({name:res.data.user.name,email:res.data.user.email}))
      dispatch(setType({type:'donor'}))

      navigate('/')
    }).catch((e)=>{
      console.log(e)
    })
  }

  return (
    <div className="bg-slate-900 min-h-screen w-screen px-4 py-10 flex items-center justify-center">
      <div className="bg-slate-800 w-full md:w-2/3 lg:w-1/3 p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-8 tracking-wide text-center">
          Sign Up
        </h1>

        {[
          { id: 'name', label: 'Name', type: 'text', placeholder: 'Your Name' },
          { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
          { id: 'password', label: 'Password', type: 'text', placeholder: 'Password' },
          { id: 'contact', label: 'Contact', type: 'text', placeholder: 'Contact Number' },
          { id: 'aadhar', label: 'Aadhar', type: 'text', placeholder: 'Aadhar Number' },
          { id: 'address', label: 'Address', type: 'text', placeholder: 'Full Address' },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id} className="flex flex-col gap-2 mb-6">
            <label htmlFor={id} className="text-lg md:text-xl font-semibold text-yellow-400">
              {label}:
            </label>
            <input
              id={id}
              type={type}
              value={formData[id]}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  [id]: e.target.value,
                }))
              }
              
              placeholder={placeholder}
              className="h-12 px-4 rounded-md bg-slate-700 text-white placeholder-gray-400
                border border-slate-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400
                transition-all duration-200 ease-in-out outline-none"
              required
            />
          </div>
        ))}

        <button
          className="w-full mt-4 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold text-lg py-3 
            rounded-full shadow-md transition-all duration-200 ease-in-out"
            onClick={handleClick}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
