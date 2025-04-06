import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setUser } from '../../utils/userSlice'
import { setType } from '../../utils/typeSlice'
import axios from 'axios'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    aadhar: '',
    contact: '',
    password: '',
  });

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = () =>{
    for(let i in Object.keys(formData)){
      if(formData[i]==""){
        alert('fill all the fields')
        return
      }
    }

    axios.post('http://localhost:5000/signup-seeker',formData)
    .then(res=>{
      alert('successful signedUp')

      dispatch(setType({type:"seeker"}))
      dispatch(setUser({_id:res.data.user.id,name:res.data.user.name,email:res.data.user.email}))
      
      navigate('/')
    })
    .catch(e=>{
      console.log(e)
    })
  }

  return (
    <div className="min-h-screen py-2 bg-slate-900 flex items-center justify-center overflow-x-hidden px-4">
      <div className="bg-slate-800 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">Sign Up</h1>

        {[
          { id: 'name', label: 'Name', type: 'text', placeholder: 'Your Name' },
          { id: 'email', label: 'Email', type: 'email', placeholder: 'Your Email' },
          { id: 'address', label: 'Address', type: 'text', placeholder: 'Your Address' },
          { id: 'aadhar', label: 'Aadhar Number', type: 'text', placeholder: 'Aadhar Card Number' },
          { id: 'contact', label: 'Contact', type: 'text', placeholder: 'Phone Number' },
          { id: 'password', label: 'Password', type: 'password', placeholder: 'Create a Password' },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id} className="mb-4">
            <label htmlFor={id} className="text-yellow-400 font-semibold text-lg block mb-1">{label}:</label>
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

        <button onClick={handleClick} className="w-full mt-6 bg-yellow-400 text-slate-900 font-bold py-2 rounded-lg hover:bg-yellow-300 transition duration-200">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
