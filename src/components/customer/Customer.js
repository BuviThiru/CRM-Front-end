import React, { useEffect, useState } from "react";

import axios from "axios";
import BASE_URL from "../../utils/urls";
import TicketCard from "../ticketCards/TicketCards";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getAllusers } from "../../utils/adminServices";
import UserRecords from "../userRecords/UserRecords";
import EditUserModal from "../editUserModal/EditUserModal";
import TicketByStatusModal from "../ticketByStatusModal.js/TicketByStatusModal";
import TicketRecords from "../ticketRecords/TicketRecords";
import EditTicketModal from "../editTicketModal/EditTicketModal";
import SideBar from "../sideBar/SideBar";
import UserPRofile from "../userProfile/UserPRofile";

import CreateTicketModal from "../createTicket/CreateTicket";

function CustomerPage() {
  const [allUser, setAllUser] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [ticketsDetails, setTicketsDetails] = useState([]);
  const [ticketsByStatus, setTicketsByStatus] = useState([]);
  const [rowUser, setRowUser] = useState("");

  const ticketStatus = [
    "open",
    "inProgress",
    "resolved",
    "cancelled",
    "onHold",
  ];
  const ticketCardColor = ["success", "primary", "info", "warning", "light"];
  const [showUserModal, setShowUserModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [rowTicket, setRowTicket] = useState("");
  const [showEditTicketModal, setShowEditTicketModal] = useState(false);
  const [showTickectCards, setShowTicketCards] = useState(true);
  const [showUserRecords, setShowUserRecords] = useState(true);
  const [showTicketRecords, setShowTicketRecords] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [assignedTicketsRecord, setAssignedTicketsRecords] =useState(false);
  const [createdTicketsRecord, setCreatedTicketsRecords] = useState(false);
  const [assignedTickets,setAssignedTickets]= useState([]);
  const [createdTickets, setCreatedTickets]= useState([])
  const [showCreateTicketModal, setShowCreateTicketModal] =useState(false)
  const userType = localStorage.getItem("userType");
  const [clientTickets, setClientTickets] =useState([])

 useEffect(()=>{
  getMyAssignedTickets();
  getMyCreatedTickets();
 },[])

  useEffect(() => {
    cardDetails();
  }, [tickets]);
  useEffect(() => {
    // getMyAssignedTickets()
    getTicketsByStatus();
  }, []);
  useEffect(() => {
    getAllTickets();
  }, []);
 

  async function getMyAssignedTickets() {
    try {
      let response = await axios.get(BASE_URL + "/tickets/getMyAssignedtickets");
  
      const ticketsWithIds = response.data.result.map((ticket, index) => ({
        ...ticket,
        id: index + 1, // Generate a unique id for each ticket
      }));
      setAssignedTickets(ticketsWithIds);
    } catch (error) {
      console.log(error);
    }
  }
  


  async function getMyCreatedTickets(){
    try {
      let response = await axios.get(BASE_URL + "/tickets/getMyCreatedtickets");
     
      const ticketsWithIds = response.data.result.map((ticket, index) => ({
        ...ticket,
        id: index + 1, // Generate a unique id for each ticket
      }));
      setCreatedTickets (ticketsWithIds);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllTicketsByClient = async () => {
    try {
        const clientName = localStorage.getItem("clientName")
      let response = await axios.get(BASE_URL + `v1/tickets/getByClient/${clientName}`);
   
      const ticketsWithIds = response.data.Tickets.map((ticket, index) => ({
        ...ticket,
        id: index + 1, // Generate a unique id for each ticket
      }));
      setClientTickets(ticketsWithIds);
    } catch (error) {
      console.log(error);
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
      console.log(error);
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

  const changeTicketDetails = (event) => {
    const { name, value } = event.target;

    rowTicket[name] = value;
    setRowTicket(rowTicket);
    setShowEditTicketModal(event.target.value);
  };

  const updateUser = async () => {
    let selfId = localStorage.getItem("id")
    let updatedUser = {
      id: rowUser._id,
      name: rowUser.name,
      email: rowUser.email,
      userType: rowUser.userType,
      clientName:rowUser.clientName,
      userStatus: rowUser.userStatus,
    } 
    
    let response = await axios.patch(BASE_URL + `/user/updateUser/${selfId}`, updatedUser);
    let data = response.data.message
    let token = response.data.token
    if(selfId===rowUser._id){     
      localStorage.setItem("name",data.name);
      localStorage.setItem("email",data.email);
      localStorage.setItem("token",token);
      localStorage.setItem("clientName",data.clientName);    
    }
  
    const users = await getAllusers();
    setAllUser(users);
    setShowUserModal(false);
  };

  const updateTicket = async () => {
    try {
      let updatedTicketObj = {
        id: rowTicket._id,
        title: rowTicket.title,
        description: rowTicket.description,
        status: rowTicket.status,
        ticketPriority: rowTicket.ticketPriority,
        assignedTo: rowTicket.assignedTo,
      };
      let response = await axios.patch(
        BASE_URL + `/tickets/updateTicket/${rowTicket._id}`,
        updatedTicketObj
      );
      await getAllTickets();
      setShowEditTicketModal(false);
      if (response.data.result) alert("update successful");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.result);
    }
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
  function closeEditTicketModal() {
    setShowEditTicketModal(false);
  }
  function closeCreateTicketModal(){
    setShowCreateTicketModal(false)
  }

  return (
    <div className="d-flex  mainPageContainer">
      <div>
        <SideBar
          {...{
            setShowTicketCards,
            setShowTicketRecords,
            setShowUserProfile,
            setShowUserRecords,
            setAssignedTicketsRecords,
            setCreatedTicketsRecords,
            setShowCreateTicketModal
          }}
        />
      </div>
      <div>
        {showCreateTicketModal && <CreateTicketModal {...{showCreateTicketModal,closeCreateTicketModal,changeTicketDetails}} />}
      </div>
      <div className="adminContainer">
        {showTicketRecords && (
          <div>
            <TicketRecords
              tickets={tickets}
              setRowTicket={setRowTicket}
              setShowEditTicketModal={setShowEditTicketModal}
            />
          </div>
        )}
          {assignedTicketsRecord && (
          <div>
            <TicketRecords
              tickets={assignedTickets}
              setRowTicket={setRowTicket}
              setShowEditTicketModal={setShowEditTicketModal}
            />
          </div>
        )}
        {createdTicketsRecord && (
          <div>
            <TicketRecords
              tickets={createdTickets}
              setRowTicket={setRowTicket}
              setShowEditTicketModal={setShowEditTicketModal}
            />
          </div>
        )}
        <div>
          <TicketByStatusModal
            showTicketModal={showTicketModal}
            closeTicketModal={closeTicketModal}
            ticketsByStatus={ticketsByStatus}
          />
        </div>
        <div>

          {showTickectCards && (
            <>
            <div className="d-flex justify-content-between">
              {cardData.map((card, index) => {
                return (
                  <div
                    key={index}
                    className="m-3 d-flex justify-content-center"
                    onClick={() => showTicketModalFn(index)}
                  >
                    <TicketCard {...card} />{" "}
                  </div>
                );
              })}
              
            </div>
            <hr/></>
          )}

          {userType === "Admin" && showUserRecords ? (
            <div>
              <UserRecords
                allUser={allUser}
                setRowUser={setRowUser}
                setShowUserModal={setShowUserModal}
              />
            </div>
          ):<></>}
        </div>
        <div>
          <EditTicketModal
            showEditTicketModal={showEditTicketModal}
            closeEditTicketModal={closeEditTicketModal}
            rowTicket={rowTicket}
            changeTicketDetails={changeTicketDetails}
            updateTicket={updateTicket}
          />
        </div>
        <div className="sideBarContainer p-5"> {showUserProfile && <UserPRofile   setShowUserModal={setShowUserModal} setRowUser={setRowUser} />}</div>
        <EditUserModal
          showUserModal={showUserModal}
          closeUserModal={closeUserModal}
          rowUser={rowUser}
        //   changeUserDetails={changeUserDetails}
          updateUser={updateUser}
         
        />
      </div>
    
    </div>
  );
}

export default CustomerPage;
