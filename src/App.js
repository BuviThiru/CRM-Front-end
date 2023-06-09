import Login from "./components/login/Login";
import SignUp from "./components/signUP/SignUp";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Home from "../src/components/home/Home";
import NavBar from "../src/components/navbar/Navbar";
import Footer from "./components/footer/Footer" ;

import MainPage from "./components/admin/MainPage";



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
  const token = localStorage.getItem("token");


 
  return (
 
    <Router>     
      <Routes>
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={token ? withLayout(<Home/> 
        ) : (
          <Navigate to="/login" replace={true}/>
        )} />
        <Route path="/mainpage"  element= {withLayout(<MainPage/>)} replace={true}/>
        
        
      </Routes>
    </Router>

  );
}

export default App;
