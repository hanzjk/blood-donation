import React, { Component } from "react";
import axios from "axios";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import jwt_decode from "jwt-decode";
import { Button, Modal } from "react-bootstrap";
import Header from "./Header";
import HeaderPrimary from "./HeaderPrimary";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: {},
      stock: {},
      show: false,
      greet: "",
      time: "",
      date: "",
      adminCount: 0,
      denoCount: 0,
      patientCount: 0,
      nurseCount: 0,
      hosCount: 0,
    };
  }

  handleClose = () =>
    this.setState({
      show: false,
    });

  handleShowDelete = () =>
    this.setState({
      show: true,
    });

  componentDidMount() {
    this.display();
    this.timer();
    //if user is not logged in redirect to login page
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.replace("/admin/login");
    }
    /////////////////////////////////////////////////
    //get userID from JWT Token
    const id = jwt_decode(localStorage.getItem("token")).userId;


    //get admins count
    axios
      .get(`http://localhost:8000/admins/count`)
      .then((res) => {
        if (res.data.count) {
          this.setState({
            adminCount: res.data.count,
          });
        }
      });

    //get donors count
    axios
      .get(`http://localhost:8000/donors/count`)
      .then((res) => {
        if (res.data.count) {
          this.setState({
            donorCount: res.data.count,
          });
        }
      });

    //get hospitals count
    axios
      .get(`http://localhost:8000/hospitals/count`)
      .then((res) => {
        if (res.data.count) {
          this.setState({
            hosCount: res.data.count,
          });
        }
      });

    //get nurses count
    axios
      .get(`http://localhost:8000/nurses/count`)
      .then((res) => {
        if (res.data.count) {
          this.setState({
            nurseCount: res.data.count,
          });
        }
      });

    //get patients count
    axios
      .get(`http://localhost:8000/patients/count`)
      .then((res) => {
        if (res.data.count) {
          this.setState({
            patientCount: res.data.count,
          });
        }
      });

    axios.get(`http://localhost:8000/admin/home/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          admin: res.data.admin,
        });

        console.log(this.state.admin);

        axios
          .get(`http://localhost:8000/bloodTypes/625180fb86e97f491d23ff7f`)
          .then((res) => {
            if (res.data.success) {
              this.setState({
                stock: res.data.stock,
              });
            }
          });
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:8000/admins/delete/${id}`).then((res) => {
      this.handleClose();
    });
  };

  display = () => {
    var day = new Date();
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    this.setState({
      date: day.toLocaleDateString("en-US", options),
    });
    var hr = day.getHours();
    if (hr >= 0 && hr < 12) {
      this.setState({
        greet: "Good Morning",
      });
    } else if (hr >= 12 && hr <= 17) {
      this.setState({
        greet: "Good Afternoon",
      });
    } else {
      this.setState({
        greet: "Good Evening",
      });
    }
  };

  timer = () => {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var sec = currentTime.getSeconds();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    var t_str = hours + ":" + minutes + ":" + sec + " ";
    if (hours > 11) {
      t_str += "PM";
    } else {
      t_str += "AM";
    }
    this.setState({
      time: t_str,
    });
    setTimeout(this.timer, 1000);
  };

  render() {
    const barData = {
      labels: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      datasets: [
        {
          label: "Blood Stock",
          backgroundColor: [
            "#002366",
            "#120A8F",
            "#003399",
            "#1560BD",
            "#007BA7",
            "#5D8AA8",
            "#318CE7",
            "#A1CAF1",
          ],
          borderWidth: 2,
          data: [
            this.state.stock.Aplus,
            this.state.stock.Amin,
            this.state.stock.Bplus,
            this.state.stock.Bmin,
            this.state.stock.ABplus,
            this.state.stock.ABmin,
            this.state.stock.Oplus,
            this.state.stock.Omin,
          ],
        },
      ],
    };

    return (
      
      <div>
        <HeaderPrimary/>
        <Header />
        <div className="container">
          <div className="flex-row">
            <div className="card" style={{ margin: "20px" }}>
              <div className="card-body">
                <span style={{ color: "blue" }}>
                  <h3>
                    {this.state.greet} Dr.{this.state.admin.name}!
                  </h3>
                  <div style={{ float: "right" }}>
                    <h5>{this.state.date}</h5>
                    <h5>{this.state.time}</h5>
                  </div>
                </span>
                <p>
                  Welcome to the Blood Donation Management Information System
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <div className="card" style={{ margin: "20px" }}>
                <div className="card-body">
                  <span style={{ float: "right" }}><i class="fa fa-user-md" aria-hidden="true"></i></span>
                  <div className="d-flex flex-column align-items-center text-center">
                    <a style={{ textDecoration: "none" }} href="/admins"><span style={{ fontWeight: "bold" }}>{this.state.adminCount}</span></a>Admins
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="card" style={{ margin: "20px" }}>
                <div className="card-body">
                  <span style={{ float: "right" }}><i class="fa fa-heartbeat" aria-hidden="true"></i></span>
                  <div className="d-flex flex-column align-items-center text-center">
                    <a style={{ textDecoration: "none" }} href="/admin/donors"><span style={{ fontWeight: "bold" }}>{this.state.donorCount}</span></a>Donors
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="card" style={{ margin: "20px" }}>
                <div className="card-body">
                  <span style={{ float: "right" }}><i class="fa fa-medkit" aria-hidden="true"></i></span>
                  <div className="d-flex flex-column align-items-center text-center">
                    <a style={{ textDecoration: "none" }} href="/admin/nurses"><span style={{ fontWeight: "bold" }}>{this.state.nurseCount}</span></a>Nurses
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="card" style={{ margin: "20px" }}>
                <div className="card-body">
                  <span style={{ float: "right" }}><i class="fa fa-hospital-o" aria-hidden="true"></i></span>
                  <div className="d-flex flex-column align-items-center text-center">
                    <a style={{ textDecoration: "none" }} href="/admin/hospitals"><span style={{ fontWeight: "bold" }}>{this.state.hosCount}</span></a>Hospitals
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="card" style={{ margin: "20px" }}>
                <div className="card-body">
                  <span style={{ float: "right" }}><i class="fa fa-users" aria-hidden="true"></i></span>
                  <div className="d-flex flex-column align-items-center text-center">
                    <a style={{ textDecoration: "none" }} href="/admin/patients"><span style={{ fontWeight: "bold" }}>{this.state.patientCount}</span></a>Patients
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="card" style={{ margin: "20px" }}>
                <div className="card-body"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-7">
              <div className="card" style={{ margin: "20px" }}>
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    {this.state.admin.name}
                  </h5>
                  <br></br>
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={`../../uploads/admin/${this.state.admin.img}`}
                      alt="photo"
                      style={{
                        width: "15%",
                        height: "15%",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    ></img>

                    <div className="mt-12">
                      <a
                        className="btn btn-success "
                        href={`/admin/edit/${this.state.admin._id}`}
                      >
                        Edit Profile <i className="fas fa-edit"></i>
                      </a>
                      &nbsp;
                      <a
                        className="btn btn-primary "
                        href={`/admin/photo/update/${this.state.admin._id}`}
                      >
                        Change Profile Photo <i className="fas fa-camera"></i>
                      </a>
                      &nbsp;
                      <a
                        className="btn btn-warning "
                        href={`/admin/password/update/${this.state.admin._id}`}
                      >
                        Change Password <i className="fas fa-unlock"></i>
                      </a>
                      &nbsp;
                      <Button variant="danger" onClick={this.handleShowDelete}>
                        Delete Account <i className="fas fa-trash"></i>
                      </Button>
                      <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title> Delete Admin Account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ textAlign: "center" }}>
                          Delete Account?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="danger"
                            onClick={() => this.onDelete(this.state.admin._id)}
                          >
                            Yes
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={this.handleClose}
                          >
                            No
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                </div>
                <dl className="d-flex flex-column align-items-center">
                  <dl className="row">
                    <dt className="col-lg-3">Admin ID</dt>
                    <dd className="col-lg-9">{this.state.admin.adminId}</dd>
                    <hr></hr>
                    <dt className="col-lg-3">Email</dt>
                    <dd className="col-lg-9">{this.state.admin.email}</dd>
                  </dl>
                </dl>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card" style={{ margin: "20px" }}>
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    Blood Stock
                  </h5>
                  <br></br>
                  <Bar
                    data={barData}
                    options={{
                      title: {
                        display: true,
                        text: "Current Blood Stock",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
