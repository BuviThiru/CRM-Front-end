import React, { useEffect, useState } from "react";
import "./admin.css";
import Home from "../home/Home";
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
import Swal from "sweetalert2";
import Shimmer from "../shimmer/shimmer";

function MainPage() {
  const [allUser, setAllUser] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [rowUser, setRowUser] = useState("");
  const [updateTicketLoading, setUpdateTicketLoading] = useState(false);
  const [homepage, setHomepage] = useState(true);
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
  const [showTickectCards, setShowTicketCards] = useState(false);
  const [showUserRecords, setShowUserRecords] = useState(false);
  const [showTicketRecords, setShowTicketRecords] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [updateUserLoading, setUpdateUserLoading] = useState(false);
  const userType = localStorage.getItem("userType");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userType === "Admin") {
          const user = await getAllusers();
          setAllUser(user);
        } else return;
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
    try {
      setUpdateUserLoading(true);
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
      // console.log(response);
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
    } catch (err) {
      console.log(err);
    } finally {
      setUpdateUserLoading(false);
    }
  };

  const updateTicket = async () => {
    try {
      setUpdateTicketLoading(true);
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

      setShowEditTicketModal(false);
      if (response.data.result) {
        Swal.fire({
          title: "Update Result",
          text: "Successfully updated",
          icon: "success",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Sorry!",
        text: `${err?.response?.data?.result}`,
        icon: "error",
      });
    } finally {
      setUpdateTicketLoading(false);
    }
  };

  function closeUserModal() {
    setShowUserModal(false);
  }

  function closeTicketModal() {
    setShowTicketModal(false);
  }
  // function showTicketModalFn(index) {
  //   setShowTicketModal(true);
  // }
  function closeEditTicketModal() {
    setShowEditTicketModal(false);
  }
  function closeCreateTicketModal() {
    setShowCreateTicketModal(false);
  }

  async function getTickets(type) {
    setType(type);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTickets([]);
      // console.log(localStorage.getItem("name"))
      let response;

      switch (type) {
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
      setLoading(false);
    };

    fetchData();
  }, [type]);

  useEffect(() => {
    setTickets([]);
  }, []);
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
            setHomepage,
            getTickets: getTickets,
            setTickets,
          }}
        />
      </div>
      {loading ? (
        <Shimmer />
      ) : (
        <div>
          <div>{homepage && <Home />}</div>
          <div>
            {showTickectCards && (
              <>
                <div className="d-flex mr-3">
                  {cardData.map((card, index) => {
                    return (
                      <div key={index} className="d-flex m-3 px-3">
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
                isLoading={updateTicketLoading}
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
              isLoading={updateUserLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
