import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux'

function NavBar() {
    const user = useSelector((store)=> store.user) 
  return (
    <Navbar expand="lg" className='d-flex align-item-center darkerBlue' fixed='top'>
      <Container>

        <div>
        <Navbar.Brand >Logo</Navbar.Brand>
        </div>
         <div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  className='mr-2 text-white font-weight-bold'>Home</Nav.Link>
            <Nav.Link  className='mr-2 text-white font-weight-bold'>Welcome {user.name}!</Nav.Link>
            <NavDropdown className='mr-2 custom-nav-dropdown font-weight-bold' title="Tickets" id="basic-nav-dropdown">
              <NavDropdown.Item >  Create New Ticket</NavDropdown.Item>
              <NavDropdown.Item > View your Tickets      
              </NavDropdown.Item>
              <NavDropdown.Item > Tickets Assigned     
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className='mr-2 text-white font-weight-bold'>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </div>
      </Container>
      
    </Navbar>
  );
}

export default NavBar;