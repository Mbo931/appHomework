import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import './index.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profil from './components/Profil.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
    path:"/login",
    element:<Login/>,
  },
  {
      path:"/register",
      element:<Register/>
  },
  {
    path:"/profil",
    element: <Profil/>
  },
  {
    path:"/home",
    element:<Home/>
  }
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
