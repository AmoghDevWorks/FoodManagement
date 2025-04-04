import React from 'react'
import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from './utils/appstore'
import Header from './components/Header'
import Home from './components/Home'
import Footer from './components/Footer'
import About from './components/About'
import Contact from './components/Contact'

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
