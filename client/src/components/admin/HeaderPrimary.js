import React, { Component } from "react";

import { MDBNavbar, MDBContainer, MDBNavbarBrand } from "mdb-react-ui-kit";
 import {
   Navbar,
  
} from "react-bootstrap";
 
export default class HeaderPrimary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {},
    };
  }

  render() {
      return (
        <>
          <Navbar className="navBar" expand="lg" sticky="top">
            <Navbar.Brand className="navBarBrand">
              Blood Donation Management Information System
            </Navbar.Brand>

            {/* <div class=" navbar-collapse justify-content-end navBarBrand1">
              <h5>Admin Login</h5>
            </div> */}
          </Navbar>
        </>
      );
  }
}
