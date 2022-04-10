import React, { Component } from "react";
import axios from "axios";

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      admin: {},
    };
  }

  handleLogout = (e) => {
    localStorage.clear();
    window.location.replace("http://localhost:3000/admin/login/");

  };

  // componentDidMount() {
  //     const id = this.props.match.params.id;
  //     axios.get(`http://localhost:8000/admin/dashboard/${id}`).then((res) => {
  //         if (res.data.success) {
  //             this.setState({
  //                 admin: res.data.admin
  //             });
  //             console.log(this.state.admin);
  //         }
  //     })
  // }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Admin Dashboard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href={`/admin/home/${this.state.admin._id}`}
                >
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href={`/admin/messenger`}
                >
                  Chat Portal
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href={`/admin/donors`}>
                  Donors
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/nurses">
                  Nurses
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admins">
                  Admins
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Receivers
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLinkRec"
                >
                  <li>
                    <a className="dropdown-item" href="/admin/patients">
                      Patients
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/admin/add/stockkeeper">
                      Hospitals
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLinkRec"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Add
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li className="nav-item">
                    <a className="dropdown-item" href="/admins/save">
                      Add Admin
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/nurses/save">
                      Add Nurse
                    </a>
                  </li>
                </ul>
              </li>


              <li className="nav-item">
                <a className="nav-link btn" onClick={this.handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
