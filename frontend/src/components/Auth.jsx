import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [selectedRole, setSelectedRole] = useState("")
  const navigate = useNavigate()

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
  }

  const handleClick = ()  =>{
    if(selectedRole === "donor"){
      navigate('/donor-login')
    }else if(selectedRole === "seeker"){
      navigate('/seekers-login')
    }else{
      navigate('/volunteer-login')
    }
  }

  return (
    <div className='h-screen bg-slate-900 p-4 flex items-center justify-center'>
        <div className='h-fit w-full md:w-1/2 lg:w-1/3 bg-slate-800 rounded-lg text-white p-4'>
            <h1 className="text-5xl font-extrabold text-yellow-400 mb-6 tracking-wide text-center">Provide Role</h1>
            
            <div className='flex flex-col gap-4 mb-6'>
                <div 
                  className={`h-14 bg-slate-600 flex items-center gap-4 rounded-lg p-2 cursor-pointer ${selectedRole === 'donor' ? 'ring-2 ring-yellow-400' : ''}`}
                  onClick={() => handleRoleSelect('donor')}
                >
                    <input type='radio' className='hidden' checked={selectedRole === 'donor'} readOnly />
                    <div className={`h-4 w-4 border-yellow-400 border-2 border-solid rounded-full ${selectedRole === 'donor' ? 'bg-yellow-400' : ''}`}></div>
                    <span>Donor</span>
                </div>
                
                <div 
                  className={`h-14 bg-slate-600 flex items-center gap-4 rounded-lg p-2 cursor-pointer ${selectedRole === 'seeker' ? 'ring-2 ring-yellow-400' : ''}`}
                  onClick={() => handleRoleSelect('seeker')}
                >
                    <input type='radio' className='hidden' checked={selectedRole === 'seeker'} readOnly />
                    <div className={`h-4 w-4 border-yellow-400 border-2 border-solid rounded-full ${selectedRole === 'seeker' ? 'bg-yellow-400' : ''}`}></div>
                    <span>Seeker</span>
                </div>
                
                <div 
                  className={`h-14 bg-slate-600 flex items-center gap-4 rounded-lg p-2 cursor-pointer ${selectedRole === 'volunteer' ? 'ring-2 ring-yellow-400' : ''}`}
                  onClick={() => handleRoleSelect('volunteer')}
                >
                    <input type='radio' className='hidden' checked={selectedRole === 'volunteer'} readOnly />
                    <div className={`h-4 w-4 border-yellow-400 border-2 border-solid rounded-full ${selectedRole === 'volunteer' ? 'bg-yellow-400' : ''}`}></div>
                    <span>Volunteer</span>
                </div>
            </div>
            
            <button 
                className={`w-full h-14 rounded-lg font-bold text-lg transition-colors ${
                    selectedRole 
                    ? 'bg-yellow-400 text-slate-900 hover:bg-yellow-500' 
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
                disabled={!selectedRole}
                onClick={handleClick}
            >
                Continue
            </button>
        </div>
    </div>
  )
}

export default Auth