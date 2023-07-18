import Login from "./components/login/Login";
import SignUp from "./components/signUP/SignUp";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";

import NavBar from "../src/components/navbar/Navbar";
import Footer from "./components/footer/Footer" ;

import MainPage from "./components/admin/MainPage";
import { useEffect, useState } from "react";



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
 const [token,setToken] = useState("")
//  useEffect(() => {
    
//   window.addEventListener('storage', () => {
//     // When local storage changes, dump the list to
//     // the console.
//      setToken((localStorage.getItem('token')) || "")   
//   });
     
  // }, [token])


  useEffect(() => {
    const handleExceptionData = () => {
        setToken(localStorage.getItem('token'))
    }
    window.addEventListener('storage', handleExceptionData)
    return function cleanup() {
        window.removeEventListener('storage', handleExceptionData)
    }
}, [token])
console.log("RENDERED",token)
  return (
     <Router>     
      <Routes>
        <Route path="/" element={!token?<Navigate to="/login" replace={true} />:<Navigate to = "/mainpage" replace={true}/>} />
        <Route path="/login" element={!token?<Login />:<Navigate to = "/mainpage" replace={true}/>} />
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mainpage" element={token ? withLayout(<MainPage/> 
        ) : (
          <Navigate to="/login" replace={true}/>
        )} />        
        
      </Routes>
    </Router>

  );
}

export default App;
