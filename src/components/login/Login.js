import { Container, Row, Col, Form } from "react-bootstrap";
import "./login.css";
import React, { useState ,useEffect} from "react";
import bdImage from '../../assets/crmPic.jpg'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  function onInputChange(e) {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }
  useEffect(() => {
    console.log("TOKEN", token);
  }, [token]);
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://crm-backend-fpru.onrender.com/crmapp/api/v1/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      console.log(data);     

      if (data.status === 201) {
         setToken(data.Message.token)
        console.log(typeof(data.Message.token));
        console.log("TOKEN",token);
        localStorage.setItem("token", data.Message.token);
        alert("Successfully Authenticated");
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
      <div  className="mt-5 black font-weight-bold text-center" >Log In</div>
    </Row>
    <Row className="mt-5 border p-5 xs={12} md={6}">
      <Col className="text-start">
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Form onSubmit={handleLoginSubmit} >
           
            <Form.Group className="mb-4 black font-weight-bold ">
              <Form.Label className="text-start " style={{ fontSize: '1.4rem'}}>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"  value={email} name = "email"
                onChange={onInputChange}/>       
                       
            </Form.Group >
            <Form.Group className="mb-4 black font-weight-bold fs-4">
              <Form.Label className="text-start" style={{ fontSize: '1.4rem'}}>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password"  value={password} name="password"
                onChange={onInputChange}/>       
                       
            </Form.Group>
          
            <button type="submit" className="btnColor d-flex align-item-center">Log In</button>
            
          </Form>
        )}
      </Col>
      <Col className="p-5 ml-3">
        <h1 className="font-weight-bold">Welcome Back!!!!!</h1>
        <h2>Waiting to serve you</h2>
      </Col>
    </Row>
    <Row>
    <button  className="btnColor d-flex align-item-center">Don't have an Account? Sign Up</button>
    </Row>
  </Container>
  </div>
  );
}

export default Login;
