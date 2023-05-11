import "./signup.css";
import React, { useState,useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import bdImage from '../../assets/crmPic.jpg'
function SignUp() {
  const [user , setUser] = useState({
    name : "",
    password :"",
    email :"",
  })
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log("TOKEN", token);
  }, [token]);
  function handleInputChange(e) {
    setUser ({...user,[e.target.name] : e.target.value})

    
  }
  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://crm-backend-fpru.onrender.com/crmapp/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...user}),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.status === 201) {
        alert("Sign In Successful");
        const response = await fetch(
          "https://crm-backend-fpru.onrender.com/crmapp/api/v1/auth/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...user}),
          }
        );
        const data = await response.json();
        console.log(data);
        setToken(data.Message.token);

        if (data.status === 201 && token) {
          console.log("TOKEN", token);
          localStorage.setItem("token", data.Message.token);
        }
      } else {
        alert(data.Message);
      }
    } catch (error) {
      console.error("Error sending login request:", error);
    }
  };
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  return (
    <div  style={{ height: '100vh',background: `url(${bdImage}) no-repeat center center fixed`,backgroundSize: "cover", 
  }} 
>

    <Container >
    <Row style={{ fontSize: '3rem',display:"flex",justifyContent :"center"}}>
      <div  className="mt-5 black font-weight-bold text-center" >Sign Up</div>
    </Row>
    <Row className="mt-5 border p-5 xs={12} md={6}">
      <Col className="text-start">
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Form onSubmit={handleSignupSubmit} >
            <Form.Group className="mb-4 black font-weight-bold">
              <Form.Label className="text-start" style={{ fontSize: '1.4rem'}}>Name</Form.Label>
              <Form.Control type="email" placeholder="Enter name"  value={user.name} name = "name"
                onChange={handleInputChange}/>       
                       
            </Form.Group>
            <Form.Group className="mb-4 black font-weight-bold ">
              <Form.Label className="text-start " style={{ fontSize: '1.4rem'}}>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"  value={user.email} name = "email"
                onChange={handleInputChange}/>       
                       
            </Form.Group >
            <Form.Group className="mb-4 black font-weight-bold fs-4">
              <Form.Label className="text-start" style={{ fontSize: '1.4rem'}}>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password"  value={user.password} name="password"
                onChange={handleInputChange}/>       
                       
            </Form.Group>
          
            <button type="submit" className="btnColor d-flex align-item-center">Sign Up</button>
            
          </Form>
        )}
      </Col>
      <Col className="p-5 ml-3">
        <h1 className="font-weight-bold">Welcome !!!!!</h1>
        <h2>Waiting to serve you</h2>
      </Col>
    </Row>
    <Row>
    <button  className="btnColor d-flex align-item-center">Already have an Account? Log In</button>
    </Row>
  </Container>
  </div>
  );
        }

export default SignUp;
