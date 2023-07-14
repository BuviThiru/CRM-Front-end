import React from 'react'
import { useNavigate } from "react-router-dom";

 const Logout=()=> {
    const navigate = useNavigate();
    function logout() {
      localStorage.clear();
       navigate("/login");
    }
  return (
    <div onClick={logout()}>logout</div>
  )
}

export default Logout