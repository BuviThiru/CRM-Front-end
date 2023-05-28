import React, { useEffect, useState } from "react";
import "./admin.css";
import MaterialTable from "@material-table/core";
import ExportCsv from "@material-table/exporters/csv";
import ExportPdf from "@material-table/exporters/pdf";
import axios from "axios";
import BASE_URL from "../../utils/urls";
import TicketCard from "../ticketCards/TicketCards";
import Modal from "react-bootstrap/Modal";
import { ModalHeader, ModalTitle } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {getAllusers } from "../../utils/adminServices";
import UserRecords from "../userRecords/UserRecords";
import EditUserModal from "../editUserModal/EditUserModal";
import TicketByStatusModal from "../ticketByStatusModal.js/TicketByStatusModal";

function AdminPage() {
  const [allUser, setAllUser] = useState([]);
  const [tickets, setTickets] = useState(100);
  const token = localStorage.getItem("token");
  const [cardData, setCardData] = useState([]);
  const [ticketsDetails, setTicketsDetails] = useState([]);
  const [ticketsByStatus, setTicketsByStatus] = useState([]);
  const [rowUser, setRowUser] = useState("");
  const ticketStatus = ["open","inProgress", "resolved", "cancelled", "onHold" ];
  const ticketCardColor = ["success", "primary", "info", "warning", "light"];
  const [showUserModal, setShowUserModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);

  

  useEffect(() => {cardDetails();}, [tickets]);
  useEffect(() => {getTicketsByStatus();}, []);
  useEffect(() => {getAllTickets(); }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getAllusers();
        setAllUser(user);
      } catch (error) {
        console.log(error)
      }
    };
  
    fetchData();
  }, []);



  const getAllTickets = async () => {
  try {
    let response = await axios.get(BASE_URL + "/tickets/gettickets");
    setTickets(response.data.Tickets);
  } catch (error) {
    console.log(error)
  }
  };
  const getTicketsByStatus = async () => {
    try {
      let res = [];
    for (let i = 0; i < ticketStatus.length; i++) {
      const response = await axios.get(
        BASE_URL + `/tickets/getticketsByStatus/${ticketStatus[i]}`
      );
      const ticketsWithId = response.data.Tickets.map((ticket) => ({
        ...ticket,
        id: ticket._id, // Add the id property using the existing _id property
      }));
      res.push(ticketsWithId);
    }
    setTicketsDetails(res);
    return res;
    } catch (error) {
      console.log(error)
    }
  };

  const cardDetails = async () => {
    let result = await getTicketsByStatus();
    let cardData = [];
    for (let i = 0; i < ticketStatus.length; i++) {
      const data = {
        cardTitle: ticketStatus[i],
        cardColor: ticketCardColor[i],
        numberOfTickets: result[i].length,
        percentage: (result[i].length * 100) / tickets.length,
        tickets: result[i],
      };
      cardData.push(data);
    }
    setCardData(cardData);
  };
  const changeUserDetails = (event) => {
    const { name, value } = event.target;
    rowUser[name] = value;
    setRowUser(rowUser);
    setShowUserModal(event.target.value);
  };

  const updateUser = async () => {
    let updatedUser = {
      id: rowUser._id,
      name: rowUser.name,
      email: rowUser.email,
      userType: rowUser.userType,
      userStatus: rowUser.userStatus,
    };
    axios.patch(BASE_URL + "/user/updateUser", updatedUser);
   const users = await getAllusers();
   setAllUser(users)
    setShowUserModal(false);
  };

  function closeUserModal() {
    setShowUserModal(false);
  }

  function closeTicketModal() {
    setShowTicketModal(false);
  }
  function showTicketModalFn(index) {
    setTicketsByStatus(ticketsDetails[index]);
    setShowTicketModal(true);
  }

  return (
    <div>
      <div>
      <TicketByStatusModal showTicketModal={showTicketModal} closeTicketModal={closeTicketModal} ticketsByStatus={ticketsByStatus} />
      </div>
      <div>
        <div className="d-flex justify-content-between">
          {cardData.map((card, index) => {
            return (
              <div
                key={index}
                className="m-3"
                onClick={() => showTicketModalFn(index)}
              >
                
                <TicketCard {...card} />{" "}
              </div>
            );
          })}
        </div>
        <hr style={{ margin: 2 + "rem" }} />
        {
          /*user data table*/
       <UserRecords   allUser={allUser}
       setRowUser={setRowUser}
       setShowUserModal={setShowUserModal} />
        }
       
      </div>
      <EditUserModal 
      showUserModal ={showUserModal} 
      closeUserModal={closeUserModal} 
      rowUser={rowUser}       
      changeUserDetails={changeUserDetails} 
      updateUser ={updateUser}/>
    </div>
  );
}

export default AdminPage;
