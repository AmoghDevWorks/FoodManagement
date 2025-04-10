import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Cart = () => {
  const id = useSelector((state) => state.user.value.id);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!id) return;
    
    axios
      .get(`http://localhost:5000/get-cart/${id}`)
      .then((res) => {
        console.log(res.data.data)
        setCartItems(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
      });
  }, [id]);

  const clearCart = () =>{
    axios.patch(`http://localhost:5000/clear-cart/${id}`)
    .then(res=>{
      alert('cleared cart')
      setCartItems([])
    })
    .catch(e=>{
      alert('error in clearing cart')
    })
  }

  return (
    <div className="min-h-[78.5vh] bg-slate-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-yellow-400">My Cart</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.foodData._id}
              className="w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-md p-4"
            >
              <img
                src={`http://localhost:5000/${item.foodData.foodImage}`}
                alt={item.foodData.name}
                className="w-full h-48 object-contain rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-yellow-300 capitalize">{item.foodData.name}</h2>
              <p className="text-md mt-1 text-slate-300">Quantity: <span className="font-bold">{item.foodQuantity}</span></p>
              <p className="text-md text-slate-400">Total Price: ₹<span className='line-through'>{item.foodData.rate * item.foodQuantity}</span><span className='text-green-500 font-semibold'>(free)</span></p>
            </div>
          ))
        ) : (
          <p className="text-lg text-slate-300 text-center">Your cart is empty.</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-10 flex justify-center gap-6">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg" onClick={clearCart}>
            Clear Cart
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
