import React, { useState } from 'react';
import axios from 'axios';

const DonateFood = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    rate: '',
    rating: '',
    image: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-slate-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-5xl font-bold text-yellow-400 mb-6 text-center">Donate Food</h2>

        {/* Input fields */}
        <div className="mb-4">
          <label className="block text-yellow-300 font-semibold mb-1">Food Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 rounded bg-slate-700 text-white" />
        </div>

        <div className="mb-4">
          <label className="block text-yellow-300 font-semibold mb-1">Quantity (plates):</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="w-full p-3 rounded bg-slate-700 text-white" />
        </div>

        <div className="mb-4">
          <label className="block text-yellow-300 font-semibold mb-1">Rate (₹):</label>
          <input type="number" name="rate" value={formData.rate} onChange={handleChange} required className="w-full p-3 rounded bg-slate-700 text-white" />
        </div>

        <div className="mb-4">
          <label className="block text-yellow-300 font-semibold mb-1">Rating (0 - 5):</label>
          <input type="number" name="rating" value={formData.rating} onChange={handleChange} step="0.1" min="0" max="5" className="w-full p-3 rounded bg-slate-700 text-white" />
        </div>

        {/* Image upload */}
        <div className="mb-6">
          <label className="block text-yellow-300 font-semibold mb-1">Upload Food Image:</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full text-white mb-2" required />
          {imagePreview && (
            <div className="mt-2">
              <p className="text-slate-300 mb-2">Preview:</p>
              <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-cover rounded border border-slate-700" />
            </div>
          )}
        </div>

        <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-2 px-4 rounded-lg transition duration-200">Donate</button>
      </form>
    </div>
  );
};

export default DonateFood;
