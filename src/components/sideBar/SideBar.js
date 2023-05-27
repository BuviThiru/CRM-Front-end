import React from 'react'
import './sidebar.css'
import {FaUsers,FaUserAlt} from 'react-icons/fa'
import {MdDashboard} from 'react-icons/md'
import {BsTicketFill} from 'react-icons/bs'
function SideBar() {
    return (
    <div className="sidebarContainer darkBlue">
        <div className='my-3'><span className='mr-2 '><MdDashboard/></span>Dash-Board</div>
        <div className= 'my-3'><span className='mr-2 '><FaUsers/></span>Users</div>
        <div className='my-3'><span className='mr-2 '><BsTicketFill/></span>Tickets</div>
        <div className='my-3'><span className='mr-2 '><FaUserAlt/></span>My Profile</div>
    </div>
  )
}
export default SideBar