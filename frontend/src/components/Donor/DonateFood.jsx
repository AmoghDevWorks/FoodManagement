import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const DonateFood = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    rate: '',
    rating: '',
    image: null,
  });

  const navigate = useNavigate()

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const data = new FormData();
  //   data.append('name', formData.name);
  //   data.append('quantity', formData.quantity);
  //   data.append('rate', formData.rate);
  //   data.append('rating', formData.rating);
  //   data.append('image', formData.image); // raw image file

  //   try {
  //     const res = await axios.post('http://localhost:5000/donate-food', data, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     alert('Food donated successfully!');
      
  //   } catch (error) {
  //     console.error('Error uploading food:', error);
  //     alert('Something went wrong!');
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('name', formData.name);
    data.append('quantity', formData.quantity);
    data.append('rate', formData.rate);
    data.append('rating', formData.rating);
    data.append('image', formData.image); // raw image file
  
    axios.post('http://localhost:5000/donate-food', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      alert('Food donated successfully!');
      navigate('/')
    })
    .catch((error) => {
      console.error('Error uploading food:', error);
      alert('Something went wrong!');
    });
  };
  

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-slate-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-5xl font-bold text-yellow-400 mb-6 text-center">Donate Food</h2>

        <div className="mb-4">
          <label className="block text-yellow-300 font-semibold mb-1">Food Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-slate-700 text-white"
            placeholder="Enter food name (e.g., Rice, Pizza)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-yellow-300 font-semibold mb-1">Quantity (plates):</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-slate-700 text-white"
            placeholder="Enter quantity (e.g., 10 plates)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-yellow-300 font-semibold mb-1">Rate (₹):</label>
          <input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-slate-700 text-white"
            placeholder="Enter rate per plate (₹)"
          />
        </div>

        <div className="mb-4">
          <label className="block text-yellow-300 font-semibold mb-1">Rating (0 - 5):</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            className="w-full p-3 rounded bg-slate-700 text-white"
            placeholder="Enter food rating (e.g., 4.5)"
          />
        </div>

        <div className="mb-6">
          <label className="block text-yellow-300 font-semibold mb-1">Upload Food Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-white mb-2"
            required
          />
          {imagePreview && (
            <div className="mt-2">
              <p className="text-slate-300 mb-2">Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded border border-slate-700"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Donate
        </button>
      </form>
    </div>
  );
};

export default DonateFood;
