import axios from "axios";
import BASE_URL from "./urls";

export const getAllusers = async () => {
  try {
    const token = localStorage.getItem("token");   
    axios.defaults.headers.common["x-access-token"] = token;
    let response = await axios.get(BASE_URL + "/getallusers");
    const usersWithIds = response.data.Users.map((user, index) => ({
      ...user,
      id: index + 1, // Generate a unique id for each ticket
    }));
    return usersWithIds;
  } catch (error) {
    console.log(error);
  }
};

export const getMyAssignedTickets = async () => {
  try {
    const token = localStorage.getItem("token");   
    axios.defaults.headers.common["x-access-token"] = token;
    let response = await axios.get(BASE_URL + "/tickets/getMyAssignedtickets");

    const ticketsWithIds = response.data.result.map((ticket, index) => ({
      ...ticket,
      id: index + 1, // Generate a unique id for each ticket
    }));
    return ticketsWithIds;
  } catch (error) {
    console.log(error);
  }
};

export const getMyCreatedTickets = async () => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["x-access-token"] = token;
    let response = await axios.get(BASE_URL + "/tickets/getMyCreatedtickets");

    const ticketsWithIds = response.data.result.map((ticket, index) => ({
      ...ticket,
      id: index + 1, // Generate a unique id for each ticket
    }));
    return ticketsWithIds;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTickets = async () => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["x-access-token"] = token;
    let response = await axios.get(BASE_URL + "/tickets/gettickets");

    const ticketsWithIds = response.data.Tickets.map((ticket, index) => ({
      ...ticket,
      id: index + 1, // Generate a unique id for each ticket
    }));

    return ticketsWithIds;
  } catch (error) {
    console.log(error);
  }
};
