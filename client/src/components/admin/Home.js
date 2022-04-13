import React, { Component } from 'react'
import axios from 'axios';
import Header from './Header'
import { Pie, Doughnut, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import jwt_decode from "jwt-decode";
import { Button, Modal } from 'react-bootstrap';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: {},
            stock: {},
            show:false
        };
    }

    handleClose = () => this.setState({
        show: false
    });

    handleShowDelete = () => this.setState({
        show: true
    });

    componentDidMount() {
        //if user is not logged in redirect to login page
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.replace("/admin/login");
        }
        /////////////////////////////////////////////////
        //get userID from JWT Token
        const id = jwt_decode(localStorage.getItem("token")).userId;

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
        axios.delete(`http://localhost:8000/admins/delete/${id}`).then(res => {
            this.handleClose();
        })
    }

    render() {
        const barData = {
            labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            datasets: [
                {
                    label: 'Blood Stock',
                    backgroundColor: [
                        '#B21F00',
                        '#C9DE00',
                        '#006B3C',
                        '#00A6B4',
                        '#6800B4',
                        '#FC8EAC',
                        '#002147',
                        '#03C03C'
                    ],
                    borderWidth: 2,
                    data: [this.state.stock.Aplus, this.state.stock.Amin, this.state.stock.Bplus, this.state.stock.Bmin, this.state.stock.ABplus, this.state.stock.ABmin,
                    this.state.stock.Oplus, this.state.stock.Omin]
                }
            ]
        }

        const pieData = {
            labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: [
                        '#B21F00',
                        '#C9DE00',
                        '#006B3C',
                        '#00A6B4',
                        '#6800B4',
                        '#FC8EAC',
                        '#002147',
                        '#03C03C'
                    ],
                    hoverBackgroundColor: [
                        '#501800',
                        '#4B5000',
                        '#175000',
                        '#003350',
                        '#35014F',
                        '#501800',
                        '#4B5000',
                        '#175000'
                    ],
                    data: [this.state.stock.Aplus, this.state.stock.Amin, this.state.stock.Bplus, this.state.stock.Bmin, this.state.stock.ABplus, this.state.stock.ABmin,
                    this.state.stock.Oplus, this.state.stock.Omin]
                }
            ]
        }
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="card" style={{ margin: "20px" }}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>{this.state.admin.name}</h5>
                                    <br></br>
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={`../../uploads/admin/${this.state.admin.img}`} alt="photo" style={{ width: "15%", height: "15%", marginLeft: "auto", marginRight: "auto" }}></img>

                                        <div className="mt-12">
                                            <a className="btn btn-success " href={`/admin/edit/${this.state.admin._id}`}>
                                                <i className="fas fa-edit"></i>&nbsp;Edit Profile</a>&nbsp;
                                            <a className="btn btn-primary " href={`/admin/password/update/${this.state.admin._id}`}>
                                                <i className="fas fa-camera"></i>&nbsp;Change Profile Photo</a>&nbsp;
                                            <a className="btn btn-warning " href={`/admin/password/update/${this.state.admin._id}`}>
                                                <i className="fas fa-unlock"></i>&nbsp;Change Password</a>&nbsp;
                                            <Button variant="danger" onClick={this.handleShowDelete}>Delete Account <i className="fas fa-trash"></i></Button>
                                            <Modal show={this.state.show} onHide={this.handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title> Delete Admin Account</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body style={{ textAlign: "center" }}>Delete Account?</Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="danger" onClick={() => this.onDelete(this.state.admin._id)}>
                                                        Yes
                                                    </Button>
                                                    <Button variant="secondary" onClick={this.handleClose}>
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
                                    <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>Chat</h5>
                                    <br></br>
                                    <div className="row">

                                        <div className="col-lg-6">
                                            <div className="card" style={{ margin: "20px" }}>
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>Donors</h5>
                                                    <div className="d-flex flex-column align-items-center text-center">
                                                        <img src={`../../assets/donors.gif`} alt="donors" style={{ width: "66%", height: "66%", marginLeft: "auto", marginRight: "auto" }}></img>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="card" style={{ margin: "20px" }}>
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>Receivers</h5>
                                                    <div className="d-flex flex-column align-items-center text-center">
                                                        <img src={`../../assets/receivers.gif`} alt="receivers" style={{ width: "100%", height: "100%", marginLeft: "auto", marginRight: "auto" }}></img>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>Current Stock</h5>
                        <div className="col-lg-7">
                            <div className="card" style={{ margin: "20px" }}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>Bar Chart View</h5>
                                    <br></br>
                                    <Bar
                                        data={barData}
                                        options={{
                                            title: {
                                                display: true,
                                                text: 'Current Blood Stock',
                                                fontSize: 20
                                            },
                                            legend: {
                                                display: true,
                                                position: 'right'
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="card" style={{ margin: "20px" }}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>Pie Chart View</h5>
                                    <br></br>
                                    <Pie
                                        data={pieData}
                                        options={{
                                            title: {
                                                display: true,
                                                text: 'Current Blood Stock',
                                                fontSize: 20
                                            },
                                            legend: {
                                                display: true,
                                                position: 'right'
                                            }
                                        }}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
