import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './Logout.css';  
import { useAuth } from '../context/AuthContext';
import Home from './Home';
import Item from './Item';
import Login from './Login';
import Signup from './Signup';
import Order from './Order';
import Bill from './Bill';
import BillDetails from './BillDetails';
import Hotel from './Hotel';
import Export from './Export';
import FileUpload from './FileUpload';

// Import Biryani, Veg, and Tiffin components
import Biryani from './Biryani';
import Veg from './Tiffins';
import Tiffin from './Veg';

const NavbarCom = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/signup'); 
  };

  const getInitials = (name) => {
    if (!name) return ''; 

    const nameParts = name.split(' ');
    const firstNameInitial = nameParts[0]?.charAt(0) || ''; 
    const lastNameInitial = nameParts[1]?.charAt(0) || ''; 

    return `${firstNameInitial}${lastNameInitial}`.toUpperCase(); 
  };

  return (
    <div>
      <Navbar bg="warning" variant="purple" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/item">Item</Nav.Link>
              <Nav.Link as={Link} to="/order">Order</Nav.Link>
              <Nav.Link as={Link} to="/billdetails">Bill Details</Nav.Link>
              <Nav.Link as={Link} to="/Export">Export</Nav.Link>
              <Nav.Link as={Link} to="/FileUpload">FileUpload</Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <NavDropdown title={
                  <div className="user-avatar">
                    {getInitials(user)}
                  </div>
                }>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/item" element={<Item />} />
        <Route path="/order" element={<Order />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/billdetails" element={<BillDetails />} />
        <Route path="/hotel/:billId" element={<Hotel />} />
        <Route path="/Export" element={<Export />} />
        <Route path="/FileUpload" element={<FileUpload />} />

        <Route path="/biryani" element={<Biryani />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/tiffin" element={<Tiffin />} />
      </Routes>
    </div>
  );
};

export default NavbarCom;
