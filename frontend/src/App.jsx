import React from 'react'
import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from './utils/appstore'
import Header from './components/Header'
import Home from './components/Home'
import Footer from './components/Footer'
import About from './components/About'
import Contact from './components/Contact'
import Auth from './components/Auth'
import DonorSignIn from './components/Donor/SignIn'
import SeekersSignIn from './components/Seekers/SignIn'
import VolunteerSignIn from './components/Volunteer/SignIn'
import DonorSignUp from './components/Donor/SignUp'
import SeekersSignUp from './components/Seekers/SignUp'
import VolunteerSignUp from './components/Volunteer/SignUp'
import DonorProfile from './components/Donor/Dashboard'
import SeekerProfile from './components/Seekers/Dashboard'
import VolunteerProfile from './components/Volunteer/Dashboard'
import DonateFood from './components/Donor/DonateFood'
import AllFood from './components/Seekers/AllFood'
import PickFood from './components/Volunteer/PickFood'
import Cart from './components/Seekers/Cart'

const Layout = () =>{
  return(
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout />,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/about',
        element:<About />
      },
      {
        path:'/contact',
        element:<Contact />
      },
      {
        path:'/login',
        element:<Auth />
      },
      {
        path:'/donor-login',
        element:<DonorSignIn />
      },
      {
        path:'/seekers-login',
        element:<SeekersSignIn />
      },
      {
        path:'/volunteer-login',
        element:<VolunteerSignIn />
      },
      {
        path:'/donor-signup',
        element:<DonorSignUp />
      },
      {
        path:'/seekers-signup',
        element:<SeekersSignUp />
      },
      {
        path:'/volunteer-signup',
        element:<VolunteerSignUp />
      },
      {
        path:'/donor-profile',
        element:<DonorProfile />
      },
      {
        path:"/seekers-profile",
        element:<SeekerProfile />
      },
      {
        path:"/volunteer-profile",
        element:<VolunteerProfile />
      },
      {
        path:"/donor-donate",
        element:<DonateFood />
      },
      {
        path:"/get-food",
        element:<AllFood />
      },
      {
        path:'/deliver-food',
        element:<PickFood />
      },
      {
        path:'/cart',
        element:<Cart />
      }
    ]
  }
])

const App = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
