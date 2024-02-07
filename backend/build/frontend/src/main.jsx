import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import './index.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profil from './components/Profil.jsx';
import AdminBoard from './components/Board/AdminBoard.jsx';
import ReferentBoard from './components/Board/ReferentBoard.jsx';
import AnimBoard from './components/Board/AnimBoard.jsx';
import ErrorPage from './components/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
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
    path:"/profile",
    element: <Profil/>
  },
  {
    path:"/home",
    element:<Home/>
  },
  {
    path:"/admin",
    element:<AdminBoard/>
  },
  {
    path:"/refer",
    element:<ReferentBoard/>
  },
  {
    path:"/anim",
    element:<AnimBoard/>
  },

    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
