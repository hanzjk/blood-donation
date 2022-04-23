import React, { Component } from 'react'
import axios from 'axios';
import { Nav, Container, Navbar, NavDropdown } from "react-bootstrap";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {}
    };
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Admin Dashboard</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown" >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/admin/home"><i class="fa fa-home" aria-hidden="true"></i> Home</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Chat
                      </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="/admins/messenger"><i class="fa fa-comments" aria-hidden="true"></i> Donors</a></li>
                  <li><a className="dropdown-item" href="/admins/nurses"><i class="fa fa-plus-square" aria-hidden="true"></i> Recievers</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Add
                      </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="/admins/save"><i class="fa fa-address-card-o" aria-hidden="true"></i> Admin</a></li>
                  <li><a className="dropdown-item" href="/admins/nurses"><i class="fa fa-plus-square" aria-hidden="true"></i> Nurse</a></li>
                </ul>
              </li>
              <div style={{ float: "right" }}>
                <li className="nav-item" >
                  <a className="nav-link" aria-current="page" href="/admin/home"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
