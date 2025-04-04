import React from 'react'

const SignIn = () => {
  return (
    <div className='min-h-screen w-screen bg-slate-900 flex items-center justify-center px-4'>
        <div className='h-fit w-full md:w-1/2 lg:w-1/3 bg-slate-800 rounded-lg p-2'>
            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-8 tracking-wide text-center my-4">
            Log In
            </h1>
            <div className='flex items-left gap-2 flex-col mx-0 md:mx-5 lg:mx-16 my-5'>
                <label htmlFor='email' className='text-2xl font-semibold text-yellow-400'>Email:</label>
                <input className='h-10 p-2 rounded-md bg-slate-700 focus:outline-none focus:border-[1px] focus:border-yellow-400 focus:border-solid' id='email' type='email' placeholder='Email' />
            </div>
            <div className='flex items-left gap-2 flex-col mx-0 md:mx-5 lg:mx-16 my-5'>
                <label htmlFor='password' className='text-2xl font-semibold text-yellow-400'>Password:</label>
                <input className='h-10 p-2 rounded-md bg-slate-700 focus:outline-none focus:border-[1px] focus:border-yellow-400 focus:border-solid' id='password' type='text' placeholder='Password' />
            </div>
            <div className='flex items-center justify-center'>
                <button
                    className="w-1/3 my-4 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold text-lg py-3 
                        rounded-full shadow-md transition-all duration-200 ease-in-out"
                    >
                    Sign Up
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default SignIn
