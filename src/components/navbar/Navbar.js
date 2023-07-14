import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import logo from '../../assets/logo1.jpg'
import './navbar.css'

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NavBar() {
  const [name,setName] = useState("")
  useEffect(()=>{
  setName(  localStorage.getItem("name"));
  },[])
  
  const navigate = useNavigate();
  function logout() {
    localStorage.clear();
     navigate("/login");
  }
  function handleLogo(){
    navigate("/");
  }
  return (
    <Navbar
     
      className="d-flex align-item-center darkerBlue"
      fixed="top"
    >
      <Container>
      <div className="image-container">
  <img src={logo} alt="logo" className="logo" onClick={handleLogo} />
  <div className="image-overlay"></div>
</div>
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="mr-3 text-white font-weight-bold" onClick={handleLogo}>
                Home
              </Nav.Link>
              <Nav.Link className="mr-3 text-white font-weight-bold">
                Welcome {name}!
              </Nav.Link>
              
              <Nav.Link
                className="mr-3 text-white font-weight-bold"
                onClick={logout}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
