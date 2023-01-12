import React, { useState, useEffect } from 'react'
import './style.css'
import Home from './pages/home'
import RoutesApp from './routes'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const App = () => {


  return (
    <div className='app'>'
      <ToastContainer autoClose={3000} />
      <RoutesApp />

    </div>


  )
}

export default App