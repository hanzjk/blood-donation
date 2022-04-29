import React, { Component } from 'react'
import axios from 'axios'
  import { Navbar } from "react-bootstrap";
  import { Link } from "react-router-dom";
import "../../CSS/loginmodule.css";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            error: ""
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    componentDidMount(){
        
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { userName, password, error } = this.state;

        const data = {
            userName: userName,
            password: password,
            error: error
        }

        console.log(data);

        axios.post("http://localhost:8000/nurse/login", data).then((res) => {
            if (res.data.success) {
                this.setState({
                    userName: "",
                    password: "",
                    error: ""
                });
                localStorage.setItem("nurseToken",res.data.token)
                console.log("Password matched");
                this.props.history.push(`/nurse/home`)
            }
            else {
                if (res.data.messageUser) {
                    this.setState({
                        error: res.data.messageUser
                    })
                }

                else if (res.data.messagePassword) {
                    this.setState({
                        error: res.data.messagePassword
                    })
                }

                console.log(error);
            }

        })
    }


    render() {
        return (
          <>
            <Navbar className="navBar" expand="lg" sticky="top">
              <Navbar.Brand className="navBarBrand">
                Blood Donation Management Information System
              </Navbar.Brand>

              <div class=" navbar-collapse justify-content-end navBarBrand1">
                <h5>Nurse Login</h5>
              </div>
            </Navbar>

            <div className="login_container">
              <div className="login_form_container">
                <div className="left">
                  <form className="form_container">
                    <h1>Login to Your Account</h1>
                    <input
                      type="email"
                      placeholder="Email"
                      name="userName"
                      required
                      className="input"
                      value={this.state.userName}
                      onChange={this.handleInputChange}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      required
                      className="input"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                    {this.state.error ? (
                      <div className="error_msg">{this.state.error}</div>
                    ) : null}
                    <button
                      type="submit"
                      className="green_btn"
                      onClick={this.onSubmit}
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        );
    }
}
