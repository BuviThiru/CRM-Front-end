import React, { useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
import BASE_URL from "../../utils/urls";
import TicketCard from "../ticketCards/TicketCards";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  getAllTickets,
  getAllusers,
  getMyAssignedTickets,
  getMyCreatedTickets,
} from "../../utils/adminServices";
import UserRecords from "../userRecords/UserRecords";
import EditUserModal from "../editUserModal/EditUserModal";
import TicketByStatusModal from "../ticketByStatusModal.js/TicketByStatusModal";
import TicketRecords from "../ticketRecords/TicketRecords";
import EditTicketModal from "../editTicketModal/EditTicketModal";
import SideBar from "../sideBar/SideBar";
import UserPRofile from "../userProfile/UserPRofile";
import "./admin.css";
import CreateTicketModal from "../createTicket/CreateTicket";

function AdminPage() {
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
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const userType = localStorage.getItem("userType");

  // useEffect(() => {
  //   cardDetails();
  // }, [tickets]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getAllusers();
        setAllUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    if (userType) {
      fetchData();
    }
  }, [userType]);

  const changeUserDetails = (event) => {
    const { name, value } = event.target;
    rowUser[name] = value;
    setRowUser(rowUser);
    setShowUserModal(event.target.value);
  };
  const changeTicketDetails = (event) => {
    const { name, value } = event.target;

    rowTicket[name] = value;
    setRowTicket(rowTicket);
    setShowEditTicketModal(event.target.value);
  };

  const updateUser = async () => {
    let selfId = localStorage.getItem("id");
    let updatedUser = {
      id: rowUser._id,
      name: rowUser.name,
      email: rowUser.email,
      userType: rowUser.userType,
      clientName: rowUser.clientName,
      userStatus: rowUser.userStatus,
    };

    let response = await axios.patch(
      BASE_URL + `/user/updateUser/${selfId}`,
      updatedUser
    );
    let data = response.data.message;
    let token = response.data.token;
    if (selfId === rowUser._id) {
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", token);
      localStorage.setItem("clientName", data.clientName);
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
    // setTicketsByStatus(ticketsDetails[index]);
    setShowTicketModal(true);
  }
  function closeEditTicketModal() {
    setShowEditTicketModal(false);
  }
  function closeCreateTicketModal() {
    setShowCreateTicketModal(false);
  }

  async function getTickets(type) {
    const currentTicketType = type;
    let response;
    switch (currentTicketType) {
      case "all":
        response = await getAllTickets();
        break;
      case "assigned":
        response = await getMyAssignedTickets();
        break;
      case "created":
        response = await getMyCreatedTickets();
        break;

      default:
        response = await getAllTickets();
        break;
    }
    setTickets(response);
    cardDetails(response);
    return response;
  }

  const cardDetails = async (tickets) => {
    // console.log(tickets);
    const ticketData = {};
    for (let i = 0; i < ticketStatus.length; i++) {
      ticketData[ticketStatus[i]] = [];
    }
    /** above loop will result into a ticketsData object as given below:
            ticketsData = {
                "open" : [],
                "closed" : [],
                "inProgress" : [],
                "cancelled":[],
                "onHold":{}
            }
        */
    for (let i = 0; i < tickets.length; i++) {
      const currentTicket = tickets[i];
      ticketData[currentTicket.status].push(currentTicket);
    }
    let totalTickets = tickets.length;
    const cardData = [];
    for (let i = 0; i < ticketStatus.length; i++) {
      const data = {
        cardTitle: ticketStatus[i],
        cardColor: ticketCardColor[i],
        numberOfTickets: ticketData[ticketStatus[i]].length,
        percentage: parseInt(
          (ticketData[ticketStatus[i]].length * 100) / totalTickets
        ),
      };
      cardData.push(data);
    }
    setCardData(cardData);
  };

  return (
    <div className="d-flex  mainPageContainer">
      <div>
        <SideBar
          {...{
            setShowTicketCards,
            setShowTicketRecords,
            setShowUserProfile,
            setShowUserRecords,         
            setShowCreateTicketModal,
            getTickets: getTickets,
          }}
        />
      </div>
      <div> 
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
              <hr />
            </>
          )}
        </div>
      <div>


        {showCreateTicketModal && (
          <CreateTicketModal
            {...{
              showCreateTicketModal,
              closeCreateTicketModal,
              changeTicketDetails,
            }}
          />
        )}
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
        
        <div>
          <TicketByStatusModal
            showTicketModal={showTicketModal}
            closeTicketModal={closeTicketModal}
            ticketsByStatus={ticketsByStatus}
          />
        </div>
        
        <div>
          {userType === "Admin" && showUserRecords ? (
            <div>
              <UserRecords
                allUser={allUser}
                setRowUser={setRowUser}
                setShowUserModal={setShowUserModal}
              />
            </div>
          ) : (
            <></>
          )}
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
        <div className="sideBarContainer p-5">
          {" "}
          {showUserProfile && (
            <UserPRofile
              setShowUserModal={setShowUserModal}
              setRowUser={setRowUser}
            />
          )}
        </div>
        <EditUserModal
          showUserModal={showUserModal}
          closeUserModal={closeUserModal}
          rowUser={rowUser}
          changeUserDetails={changeUserDetails}
          updateUser={updateUser}
        />
      </div>
    </div>
    </div>
  );
}

export default AdminPage;
