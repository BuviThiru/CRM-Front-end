import Login from "./components/login/Login";
import SignUp from "./components/signUP/SignUp";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Home from "../src/components/home/Home";
import NavBar from "../src/components/navbar/Navbar";
import Footer from "../src/components/footer/Footer";
// import CreateTicket from "../src/components/createTicket/CreateTicket";
import Admin from "../src/components/admin/AdminPage";
import SideBar from "./components/sideBar/SideBar";
import store from "./utils/store";
import { Provider } from "react-redux";
import { useState } from "react";


function withLayout(Component) { 
    return (
      <>
        <NavBar />
        <div className="d-flex flexDirection column">
        <SideBar />
        {Component}
        </div>
        <Footer />
      </>
    );
  };


function App() {
  const token = useState(localStorage.getItem("token"));


   console.log(token)
  const userType = "Admi"
  return (
    <Provider store={store}>
    <Router>     
      <Routes>
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={token ? withLayout(<Home/> 
        ) : (
          <Navigate to="/login" replace={true}/>
        )} />
        <Route path="/admin" element={userType==="Admin"? withLayout(<Admin/>) : <Navigate to="/" replace={true}/>} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
