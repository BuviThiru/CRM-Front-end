import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { FaUsers, FaUserAlt } from "react-icons/fa";
import { MdDashboard} from "react-icons/md";
import { BsTicketFill } from "react-icons/bs";
function SideBar({
  setShowTicketCards,
  setShowTicketRecords,
  setShowUserProfile,
  setShowUserRecords,
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  let role = localStorage.getItem("userType");
  useEffect(()=>{
    if (role === "Admin") {
      setIsAdmin(true);
    }
  },[role])

  function handleDashBoardClick() {
    setShowTicketCards(true);
    isAdmin ? setShowUserRecords(true) : setShowUserRecords(false);
    setShowTicketRecords(false);
    setShowUserProfile(false);
  }

  function handleUsersClick() {
    setShowTicketCards(false);
    setShowUserRecords(true);
    setShowTicketRecords(false);
    setShowUserProfile(false);
  }
  function handleTicketsClick() {
    setShowTicketCards(false);
    setShowUserRecords(false);
    setShowTicketRecords(true);
    setShowUserProfile(false);
  }
  function handleProfileClick() {
    setShowTicketCards(false);
    setShowUserRecords(false);
    setShowTicketRecords(false);
    setShowUserProfile(true);
  }
  return (
    <div className="sidebarContainer darkBlue">
      <div className="my-3 cursor-pointer bold" onClick={handleDashBoardClick}>
        <span className="mr-2 cursor-pointer">
          <MdDashboard />
        </span>
        Dash-Board
      </div>
      {isAdmin && (
        <div className="my-3 cursor-pointer" onClick={handleUsersClick}>
          <span className="mr-2 ">
            <FaUsers />
          </span>
          Users
        </div>
      )}
      <div className="my-3 cursor-pointer" onClick={handleTicketsClick}>
        <span className="mr-2 ">
          <BsTicketFill />
        </span>
        Tickets
      </div>
      <div className="my-3 cursor-pointer" onClick={handleProfileClick}>
        <span className="mr-2 ">
          <FaUserAlt />
        </span>
        My Profile
      </div>
    </div>
  );
}
export default SideBar;
