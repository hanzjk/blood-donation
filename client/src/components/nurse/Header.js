import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nurse: {},
        };
    }

    // componentDidMount() {
    //     //if user is not logged in redirect to login page
    //     const token = localStorage.getItem("nurseToken");

    //     if (!token) {
    //         window.location.replace("/nurse/login");
    //     }
    //     /////////////////////////////////////////////////
    //     //get userID from JWT Token
    //     const id = jwt_decode(localStorage.getItem("nurseToken")).userId;
    // }

    handleLogout = (e) => {
        localStorage.clear();
        window.location.replace("/nurse/login");
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#002D62" }}>
                <div className="container-fluid">
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
                        <ul className="navbar-nav" >
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/nurse/home">
                                    <i className="fa fa-home" aria-hidden="true"></i> Home
                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    type="button"
                                    className="nav-link"
                                    aria-current="page"
                                    onClick={this.handleLogout}
                                >
                                    <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                  </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
