import React, { useState } from 'react'
import "./home.css"
import { useNavigate } from "react-router-dom";
import homePageLogo from '../../assets/crmHomePAge.png'

function Home() {
const navigate = useNavigate()
const userType = localStorage.getItem("userType")
  const handleButtonClick = () => {
    // if(userType === "Customer")  navigate('/customer')
     navigate('/admin')
  };

  return (
    <div className='homeContainer' >
      <img src = {homePageLogo} alt="homePage Logo " className='homePAgeLogo'/>
      <h1> “Customer service is about empathy.” - Chaz Van de Motter</h1>  
      <button className='btnColor' onClick={handleButtonClick}>Proceed</button>
    </div>
 
  );
  
 
}

export default Home