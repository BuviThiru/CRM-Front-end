import React, { useState,useEffect } from 'react'
import USerImage from '../../assets/userImage.png'
import './userProfile.css'
import axios from 'axios';
import BASE_URL from '../../utils/urls';

function UserPRofile({setShowUserModal,setRowUser}) {
  let [name,setName] = useState("");
  let [email,setEmail] = useState("");
  let [userType,setUserType] = useState("");
  let [clientName, setClientName] =useState("");
    useEffect(() => {
       setName(localStorage.getItem("name")) ;
        setEmail(localStorage.getItem("email"));
        setUserType(localStorage.getItem("userType")) ; 
        setClientName(localStorage.getItem("clientName"));        
      }, []); 

    

      let userId = localStorage.getItem("id")
      async function getUserById(){
              const user = await axios.get(`${BASE_URL}/getUserById/${userId}`)
              console.log(user.data.Message)
              setRowUser(user.data.Message)
              setShowUserModal(true)
      }

  return (
    <div>
        <img className='userImage' src={USerImage} alt="User"/>
        <hr/>
        <div> Name : {name}</div>
        <div> Email : {email}</div>
        <div> Role : {userType}</div>
        <div>Organization : {clientName}</div>
        <button onClick={getUserById}>Edit Profile</button>
    </div>
  )
}

export default UserPRofile