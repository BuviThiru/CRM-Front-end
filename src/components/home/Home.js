import React, { useState } from 'react'
import "./home.css"

function Home() {

  const [isMoving, setIsMoving] = useState (false);

  const handleButtonClick = () => {
    setIsMoving(true);
    setTimeout(() => {
      setIsMoving(false);
    }, 1000); // Adjust the duration as needed
  };

  return (
    <div className='lighterBlue' style={{width:"165vh"}}>
      <div>Hia</div>
    <div className={`button-container ${isMoving ? "moving" : ""}`}>
      <button onClick={handleButtonClick}>Move</button>
    </div>
    </div>
  );
  
 
}

export default Home