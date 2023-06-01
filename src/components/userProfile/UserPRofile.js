import React, { useState,useEffect } from 'react'
import USerImage from '../../assets/userImage.png'
import './userProfile.css'

function UserPRofile() {
  let [name,setName] = useState("");
  let [email,setEmail] = useState("");
  let [userType,setUserType] = useState("")
    useEffect(() => {
       setName(localStorage.getItem("name")) ;
        setEmail(localStorage.getItem("email"));
        setUserType(localStorage.getItem("userType")) ;     
      
      }, []); 

  return (
    <div>
        <img className='userImage' src={USerImage} alt="User"/>
        <hr/>
        <div> Name : {name}</div>
        <div> Email : {email}</div>
        <div> Role : {userType}</div>
    </div>
  )
}

export default UserPRofile