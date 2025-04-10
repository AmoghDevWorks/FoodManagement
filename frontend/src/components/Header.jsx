import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../utils/userSlice";
import { Heart } from "lucide-react";
import { clearType } from "../utils/typeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const type = useSelector((state)=>state.type.value)

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearType())
    navigate("/login"); // Redirect to login page after logout
  };

  const handleClick = () =>{

    if(!type){
      navigate('/')
    }

    if(type.type === "donor"){
      navigate('/donor-profile')
    }else if(type.type === "seeker"){
      navigate('/seekers-profile')
    }else{
      navigate('/volunteer-profile')
    }
  }

  return (
    <nav className="bg-gray-800 shadow-md sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo & Branding */}
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-yellow-500" />
            <span className="ml-2 text-xl font-bold text-white">LeftOverLove</span>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link to="/" className="text-yellow-400 hover:text-yellow-500 transition">Home</Link>
            <Link to="/about" className="text-yellow-400 hover:text-yellow-500 transition">About</Link>
            <Link to="/contact" className="text-yellow-400 hover:text-yellow-500 transition">Contact</Link>
            { type &&  type.type==='seeker' && <Link to="/get-food" className="text-yellow-400 hover:text-yellow-500 transition">Food</Link>}
            { type &&  type.type==='seeker' && <Link to="/cart" className="text-yellow-400 hover:text-yellow-500 transition">Cart</Link>}
          </div>

          {/* Authentication Buttons */}
          <div className="flex space-x-4">
            {user ? (
              <div className="flex items-center gap-5"> 
                <div className="h-10 w-10 rounded-full bg-slate-300 cursor-pointer" onClick={handleClick}>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
              
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-yellow-400 hover:text-yellow-500 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
