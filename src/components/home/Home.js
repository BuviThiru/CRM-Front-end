import React, { useState } from 'react'
import "./home.css"
import { useNavigate } from "react-router-dom";

function Home() {
const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/admin')
  };

  return (
    <div className='homeContainer' >
      <h1> “Customer service is about empathy.” - Chaz Van de Motter</h1>  
      <button className='btnColor' onClick={handleButtonClick}>Proceed</button>
    </div>
 
  );
  
 
}

export default Home