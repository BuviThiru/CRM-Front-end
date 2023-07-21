import React from 'react'
import "./home.css"

import homePageLogo from '../../assets/crmHomePAge.png'

function Home() {



  return (
    <div className='homeContainer' >
      <img src = {homePageLogo} alt="homePage Logo " className='homePAgeLogo'/>
      <h1> “Customer service is about empathy.” - Chaz Van de Motter</h1>  
    
    </div>
 
  );
  
 
}

export default Home