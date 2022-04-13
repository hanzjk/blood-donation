import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      error: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { userName, password, error } = this.state;

    const data = {
      userName: userName,
      password: password,
      error: error,
    };

    console.log(data);
    axios.post("http://localhost:8000/admin/login", data).then((res) => {
      console.log("lk");
      if (res.data.success) {
        this.setState({
          userName: "",
          password: "",
          error: "",
        });
        localStorage.setItem("token", res.data.token);

        console.log("Password matched");
        this.props.history.push(`/admin/home`);
      } else {
        if (res.data.messageUser) {
          this.setState({
            error: res.data.messageUser,
          });
        } else if (res.data.messagePassword) {
          this.setState({
            error: res.data.messagePassword,
          });
        }
      }
      console.log(error);
    });
  };

  render() {
    return (
      <div className="container">
        <div className="col-md-8 mt-4 mx-auto">
          <h1 className="h3 mb-3 font-weight-normal">Admin Login</h1>
          <form className="needs-validation" noValidate>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Email Address</label>
              <input
                type="text"
                className="form-control"
                name="userName"
                placeholder="Enter email address"
                value={this.state.userName}
                onChange={this.handleInputChange}
              ></input>
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter the password"
                value={this.state.password}
                onChange={this.handleInputChange}
              ></input>
            </div>
            {this.state.error ? (
              <div className="alert alert-danger">{this.state.error}</div>
            ) : null}

            <button
              className="btn btn-primary"
              type="submit"
              style={{ marginTop: "15px", width: "100%" }}
              onClick={this.onSubmit}
            >
              &nbsp; Login
            </button>
          </form>
          <br></br>
        </div>
      </div>
    );
  }
}
