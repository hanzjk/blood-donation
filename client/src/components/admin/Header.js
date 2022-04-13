import React, { Component } from "react";
import { Navbar, NavLink, Container, NavDropdown, Nav, Offcanvas, Form, FormControl, Button } from 'react-bootstrap';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      admin: {},
    };
  }

  handleLogout = (e) => {
    localStorage.clear();
    window.location.replace("/admin/login/");

  };

  render() {
    return (
      <Navbar expand={false} bg="dark" variant="dark" className="navClass" >
        <Container>
          <Navbar.Brand>
            {/* <img alt="" src={"assets/logo.jpg"} width="30" height="30" className="d-inline-block align-top" />{' '} */}
          Blood Donation - Admin Account
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Blood Donation - Admin Account</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink href='/admin/home' >Home <i class="fa fa-home" aria-hidden="true"></i></NavLink>
                <NavLink href='/admin/donors' >Donors <i class="fa fa-heartbeat" aria-hidden="true"></i></NavLink>
                <NavLink href='/admin/nurses' >Nurses <i class="fa fa-medkit" aria-hidden="true"></i></NavLink>
                <NavLink href='/admins' >Admins <i class="fa fa-user-md" aria-hidden="true"></i></NavLink>
                <NavLink href='/admin/messenger' >Chat</NavLink>
                <NavDropdown title="Recievers" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="/admin/hospitals">Hospitals <i class="fa fa-hospital-o" aria-hidden="true"></i></NavDropdown.Item>
                  <NavDropdown.Item href="/admin/patients">Patients <i class="fa fa-users" aria-hidden="true"></i></NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Add" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="/admins/save">Admins <i class="fa fa-address-card-o" aria-hidden="true"></i></NavDropdown.Item>
                  <NavDropdown.Item href="/nurses/save">Nurses <i class="fa fa-plus-square" aria-hidden="true"></i></NavDropdown.Item>
                </NavDropdown>
                <NavLink onClick={this.handleLogout}>Logout <i class="fa fa-sign-out" aria-hidden="true"></i></NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  }
}
