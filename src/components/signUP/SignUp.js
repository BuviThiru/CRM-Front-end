import "./signup.css";
import React, { useState } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    userType: "Customer",
  });

  function handleInputChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  function moveToLogin() {
    navigate("/login");
  }
  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (user.name === "" || user.password === "" || user.email === "") {
      Swal.fire({
        title: "Error!",
        text: "Enter all fields!!",
        icon: "warning",
      });
      return;
    }
    try {
      const response = await fetch(
        "https://crm-backend-fpru.onrender.com/crmapp/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...user }),
        }
      );
      const data = await response.json();

      if (data.status === 201) {
        const response = await fetch(
          "https://crm-backend-fpru.onrender.com/crmapp/api/v1/auth/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...user }),
          }
        );
        const data1 = await response.json();

        if (data1.status === 201) {
          localStorage.setItem("token", data1.Message.token);      
          localStorage.setItem("name", data1.Message.user.name);
          localStorage.setItem("email", data1.Message.user.email);
          localStorage.setItem("userType", data1.Message.user.userType);
          localStorage.setItem("clientName", data1.Message.user.clientName);
          localStorage.setItem("userType", data1.Message.user.userType);
          Swal.fire({
            title: "Welcome!",
            text: "Successfully Signed-up & Authenticated",
            icon: "success",
          }).then(() => {
            navigate("/");
          });
        } else {
          Swal.fire({
            title: "Sorry!",
            text: `${data.Message}`,
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: "Sorry!",
          text: `${data.Message}`,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error sending login request:", error);
      Swal.fire({
        title: "Sorry!",
        text: `${error}`,
        icon: "error",
      });
    } finally {
      setIsLoading(false); // Stop loading
    }}

    return (
      <div className="backgroundImage">
        <Container>
          <Row
            style={{
              fontSize: "3rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="mt-5 black font-weight-bold text-center">
              Sign Up
            </div>
          </Row>
          <Row className="mt-5 border p-5 xs={12} md={6}">
            <Col className="text-start">
              <Form onSubmit={handleSignupSubmit}>
                <Form.Group className="mb-4 black font-weight-bold">
                  <Form.Label
                    className="text-start"
                    style={{ fontSize: "1.4rem" }}
                  >
                    Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="black"
                    placeholder="Enter name"
                    value={user.name}
                    name="name"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-4 black font-weight-bold ">
                  <Form.Label
                    className="text-start "
                    style={{ fontSize: "1.4rem" }}
                  >
                    Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={user.email}
                    name="email"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-4 black font-weight-bold fs-4">
                  <Form.Label
                    className="text-start"
                    style={{ fontSize: "1.4rem" }}
                  >
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={user.password}
                    name="password"
                    onChange={handleInputChange}
                    autoComplete="user-password"
                  />
                </Form.Group>
                <Form.Group className="mb-4 black font-weight-bold">
                  <Form.Label
                    className="text-start"
                    style={{ fontSize: "1.4rem" }}
                  >
                    User Type
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={user.userType}
                    name="userType"
                    onChange={handleInputChange}
                  >
                    <option value="Customer">Customer</option>
                    <option value="Engineer">Engineer</option>
                  </Form.Control>
                </Form.Group>

                <button
                  type="submit"
                  className="btnColor d-flex align-item-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="mr-2" />{" "}
                      Please wait...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </Form>
            </Col>
            <Col className="p-5 ml-3">
              <h1 className="font-weight-bold">Welcome !!!!!</h1>
              <h2>Waiting to serve you</h2>
            </Col>
          </Row>
          <Row>
            <button
              onClick={moveToLogin}
              className="btnColor d-flex align-item-center"
            >
              Already have an Account? Log In
            </button>
          </Row>
        </Container>
      </div>
    );
  };

export default SignUp;
