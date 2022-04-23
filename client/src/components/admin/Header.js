import React, { Component } from "react";
import { Navbar } from 'react-bootstrap';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

import {
  CDBDropDown,
  CDBDropDownMenu,
  CDBDropDownItem,
  CDBDropDownToggle,
  CDBContainer,
} from "cdbreact";

import { NavLink } from "react-router-dom";
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
      <div className="navbar"
        style={{ display: "flex",position:"sticky",top:0,bottom:0,height:"100vh",float:"left" }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Sidebar
          </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/admin/home" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="home">Dashboard</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/donors" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="heartbeat">Donors</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/nurses" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="medkit">Nurses</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admins" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user-md">Admins</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/patients" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="users">Patients</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/hospitals" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="hospital">Hospitals</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admins/save" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="address-card-o">Add Admin</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/nurses/save" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="plus-square">Add Nurse</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              style={{
                padding: "20px 5px",
              }}
            >
              Sidebar Footer
          </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
      // <Navbar expand={false} style={{backgroundColor:"#00755E"}} variant="dark" className="navClass" >
      //   <Container>
      //     <Navbar.Brand>
      //       {/* <img alt="" src={"assets/logo.jpg"} width="30" height="30" className="d-inline-block align-top" />{' '} */}
      //     Blood Donation - Admin Account
      //     </Navbar.Brand>
      //     <Navbar.Toggle aria-controls="offcanvasNavbar" />
      //     <Navbar.Offcanvas
      //       id="offcanvasNavbar"
      //       aria-labelledby="offcanvasNavbarLabel"
      //       placement="end"

      //     >
      //       <Offcanvas.Header closeButton style={{backgroundColor:"#00755E"}}>
      //         <Offcanvas.Title id="offcanvasNavbarLabel">Blood Donation Management Information System - Admin Account</Offcanvas.Title>
      //       </Offcanvas.Header>
      //       <Offcanvas.Body style={{backgroundColor:"#00755E",color:"white"}}>
      //         <Nav className="justify-content-end flex-grow-1 pe-3" >
      //           <NavLink href='/admin/home' >Home <i class="fa fa-home" aria-hidden="true"></i></NavLink>
      //           <NavLink href='/admin/donors' >Donors <i class="fa fa-heartbeat" aria-hidden="true"></i></NavLink>
      //           <NavLink href='/admin/nurses' >Nurses <i class="fa fa-medkit" aria-hidden="true"></i></NavLink>
      //           <NavLink href='/admins' >Admins <i class="fa fa-user-md" aria-hidden="true"></i></NavLink>
      //           <NavLink href='/admin/messenger' >Chat</NavLink>
      //           <NavDropdown title="Recievers" id="offcanvasNavbarDropdown">
      //             <NavDropdown.Item href="/admin/hospitals">Hospitals <i class="fa fa-hospital-o" aria-hidden="true"></i></NavDropdown.Item>
      //             <NavDropdown.Item href="/admin/patients">Patients <i class="fa fa-users" aria-hidden="true"></i></NavDropdown.Item>
      //           </NavDropdown>
      //           <NavDropdown title="Add" id="offcanvasNavbarDropdown">
      //             <NavDropdown.Item href="/admins/save">Admins <i class="fa fa-address-card-o" aria-hidden="true"></i></NavDropdown.Item>
      //             <NavDropdown.Item href="/nurses/save">Nurses <i class="fa fa-plus-square" aria-hidden="true"></i></NavDropdown.Item>
      //           </NavDropdown>
      //           <NavLink onClick={this.handleLogout}>Logout <i class="fa fa-sign-out" aria-hidden="true"></i></NavLink>
      //         </Nav>
      //       </Offcanvas.Body>
      //     </Navbar.Offcanvas>
      //   </Container>
      // </Navbar>
    );
  }
}
