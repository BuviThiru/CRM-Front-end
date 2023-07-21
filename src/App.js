import Login from "./components/login/Login";
import SignUp from "./components/signUP/SignUp";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";

import NavBar from "../src/components/navbar/Navbar";
import Footer from "./components/footer/Footer" ;

import MainPage from "./components/admin/MainPage";
import { useEffect, useState } from "react";
import store from "./utils/store";
import { Provider } from "react-redux";



function withLayout(Component) { 
    return (
      <>
        <NavBar />
        <div  style={{ marginTop: '3.5rem'}}>     
        <div className='lighterBlue'>{Component}</div>      
        </div>
        <Footer />
      </>
    );
  };


function App() {
const token = localStorage.getItem("token")


// console.log(token)
  return (
    <Provider store = {store}>
     <Router>     
      <Routes>      
        <Route path="/" element={!token?<Navigate to="/login" replace={true} />:<Navigate to = "/mainpage" replace={true}/>} />
        {/* <Route path="/login" element={!token?<Login />:<Navigate to = "/mainpage" replace={true}/>} /> */}
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mainpage" element={ withLayout(<MainPage/>)}/> 
      
      </Routes>
    </Router>
    </Provider> 
  );
}

export default App;
