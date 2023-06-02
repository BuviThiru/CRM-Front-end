import axios from "axios";
import BASE_URL from "./urls";


const token = localStorage.getItem("token");
axios.defaults.headers.common["x-access-token"] = token;


export const getAllusers = async () => {
    try {
      let response = await axios.get(BASE_URL + "/getallusers");
      return response.data.Users;
    } catch (error) {
      // Handle error
      console.log(error)
    }
  };
