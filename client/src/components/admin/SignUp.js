import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";
import { Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import HeaderPrimary from "./HeaderPrimary";
import "../../CSS/registermodule.css";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      adminId: "",
      email: "",
      img: "",
      password: "",
      show: false,
    };
  }

  setShow = () => {
    this.setState({
      show: false,
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  setFileName = (e) => {
    this.setState({
      img: e.target.files[0],
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", this.state.name);
    formData.append("adminId", this.state.adminId);
    formData.append("email", this.state.email);
    formData.append("img", this.state.img);
    formData.append("password", this.state.password);

    axios.post("http://localhost:8000/admins/save", formData).then((res) => {
      if (res.data.success) {
        this.setState({
          name: "",
          adminId: "",
          email: "",
          img: "",
          password: "",
          show: true,
        });
      }
    });
  };

  render() {
    return (
      <div>
        <HeaderPrimary />
        <Header />
        <div className="container">
          <div className="col-md-8 mx-auto">
            <div className="card mt-4" style={{ border: "none" }}>
              <h1 className="h3 mb-3 font-weight-normal">Add New Admin</h1>
              <form className="needs-validation" encType="multipart/form-data">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Name</label>
                  <input
                    required="true"
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  ></input>
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Admin Id</label>
                  <input
                    required="true"
                    type="text"
                    className="form-control"
                    name="adminId"
                    placeholder="Enter the Admin Id"
                    value={this.state.adminId}
                    onChange={this.handleInputChange}
                  ></input>
                </div>

                <div className="row">
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        Email Address
                      </label>
                      <input
                        required="true"
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter email address"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                      ></input>
                    </div>
                  </div>

                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        Profile Photo (Rename with admin id)
                      </label>
                      <input
                        required="true"
                        type="file"
                        className="form-control"
                        name="img"
                        onChange={this.setFileName}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Password</label>
                    <input
                      required="true"
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    ></input>
                  </div>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-success btn-block"
                    type="submit"
                    style={{ marginTop: "15px" }}
                    onClick={this.onSubmit}
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
            <br></br>
            <Alert
              show={this.state.show}
              variant="success"
              onClose={this.setShow}
              dismissible
            >
              <p style={{ textAlign: "center" }}>
                Admin Added Successfully <i className="fa fa-check-square"></i>
              </p>
            </Alert>
          </div>
        </div>
      </div>
    );
  }
}
