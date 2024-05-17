import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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

export default class NavbarCom extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>KLN Hotels</h1>
          <Navbar bg="warning" variant="purple" expand="lg">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/home">Home</Nav.Link>
                  <Nav.Link as={Link} to="/item">Item</Nav.Link>
                  <Nav.Link as={Link} to="/order">Order</Nav.Link>
                  <Nav.Link as={Link} to="/bill">Bill</Nav.Link>
                  <Nav.Link as={Link} to="/billdetails">Bill Details</Nav.Link>
                  <Nav.Link as={Link} to="/hotel">Hotel</Nav.Link>
                  <Nav.Link as={Link} to="/Export">Export</Nav.Link>
                  
                  <Nav.Link as={Link} to="/FileUpload">FileUpload</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
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
          </Routes>
        </div>
      </Router>
    );
  }
}
