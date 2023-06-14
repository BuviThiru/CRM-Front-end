import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { FaUsers, FaUserAlt } from "react-icons/fa";
import {
  MdDashboard,
  MdCreateNewFolder,
  MdAssignmentInd,
} from "react-icons/md";
import { BsTicketFill } from "react-icons/bs";
import { IoIosCreate } from "react-icons/io";
import "../../App.css";

function SideBar({
  setShowTicketCards,
  setShowTicketRecords,
  setShowUserProfile,
  setShowUserRecords,
  setShowCreateTicketModal,
  getTickets,
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  let role = localStorage.getItem("userType");

  useEffect(() => {
    if (role === "Admin") {
      setIsAdmin(true);
    }
  }, [role]);

  function handleDashBoardClick() {
    setShowTicketCards(true);
    isAdmin ? setShowUserRecords(true) : setShowUserRecords(false);
    setShowTicketRecords(false);
    setShowUserProfile(false);
    getTickets("all");
  }

  function handleUsersClick() {
    setShowTicketCards(false);
    setShowUserRecords(true);
    setShowTicketRecords(false);
    setShowUserProfile(false);
  }

  function handleTicketsClick(selectedOption) {
    setShowTicketCards(true);
    setShowUserRecords(false);
    setShowTicketRecords(true);
    setShowUserProfile(false);
    getTickets("all");
  }

  function handleProfileClick() {
    setShowTicketCards(false);
    setShowUserRecords(false);
    setShowTicketRecords(false);
    setShowUserProfile(true);
  }

  function handleAssignedTickets() {
    setShowTicketCards(true);
    setShowUserRecords(false);
    setShowTicketRecords(true);
    setShowUserProfile(false);
    getTickets("assigned");
  }

  function handleCreatedTickets() {
    setShowTicketCards(true);
    setShowUserRecords(false);
    setShowTicketRecords(true);
    setShowUserProfile(false);
    getTickets("created");
  }

  function handleCreateTicket() {
    setShowTicketCards(false);
    setShowUserRecords(false);
    setShowTicketRecords(false);
    setShowUserProfile(false);
    setShowCreateTicketModal(true);
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
      <div className="my-3 cursor-pointer bold" onClick={handleTicketsClick}>
        <span className="mr-2 cursor-pointer">
          <BsTicketFill />
        </span>
        All Tickets
      </div>

      <div className="my-3 cursor-pointer bold" onClick={handleCreatedTickets}>
        <span className="mr-2 cursor-pointer">
          <IoIosCreate />
        </span>
        Created Tickets
      </div>

      <div className="my-3 cursor-pointer bold" onClick={handleAssignedTickets}>
        <span className="mr-2 cursor-pointer">
          <MdAssignmentInd />
        </span>
        Tickets Assigned
      </div>

      <div className="my-3 cursor-pointer" onClick={handleProfileClick}>
        <span className="mr-2 ">
          <FaUserAlt />
        </span>
        My Profile
      </div>

      <div className="my-3 cursor-pointer" onClick={handleCreateTicket}>
        <span className="mr-2 ">
          <MdCreateNewFolder />
        </span>
        Create Ticket
      </div>
    </div>
  );
}
export default SideBar;
