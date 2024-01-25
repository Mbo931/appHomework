import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthView from './views/AuthView'
import FormSignup from './components/auth/FormSignup'
import FormSignin from './components/auth/FormSignIn'

function App() {

  return (
    <>
      <h1>La Fosse aux Fraises</h1>
      <FormSignin/>
       
    </>
  )
}

export default App
