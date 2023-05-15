import React from 'react'
import './sidebar.css'
import userImage from '../../assets/userImage.png'
import { useSelector } from 'react-redux'
// const user = {name: "Sharvin",email:"Sharvin@gmail.com",userType:"Customer"}



function SideBar() {
    const user = useSelector((store)=> store.user) 
    console.log("Sidebar" , user)

  return (
    <div className="sidebarContainer darkBlue">
        <h2>Hai {user.name}</h2>
       <img src={userImage} className='resizeImage' alt="User profile" />
       <div>{user.email} </div>
       <div>{user.userType} </div>
    </div>
  )
}

export default SideBar