import React from 'react'
import './sidebar.css'
import userImage from '../../assets/userImage.png'




function SideBar() {
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")
    const userType = localStorage.getItem("userType")
    console.log(userType)

  return (
    <div className="sidebarContainer darkBlue">
        <h2>Hai {name}</h2>
       <img src={userImage} className='resizeImage' alt="User profile" />
       <div>{email} </div>
       <div>{userType} </div>
    </div>
  )
}

export default SideBar