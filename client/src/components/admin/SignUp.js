import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import { Alert } from 'react-bootstrap';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            adminId: "",
            email: "",
            img: "",
            password: "",
            show:false
        }
    }

    setShow = () => {
        this.setState({
            show: false
        });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    setFileName = e => {
        this.setState({
            img: e.target.files[0]
        })
    }

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
                    password: ""
                })
                //this.props.setToken(res.sessionToken)
                console.log(res)
                console.log("res")

            }
        })
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h1 className="h3 mb-3 font-weight-normal">Add New Admin</h1>
                    <form className="needs-validation" encType="multipart/form-data">
                        <div className="form-group" style={{ marginBottom: "15px" }}>
                            <label style={{ marginBottom: '5px' }}>Name</label>
                            <input type="text" className="form-control" name="name" placeholder="Enter name" value={this.state.name} onChange={this.handleInputChange}></input>
                        </div>

                        <div className="form-group" style={{ marginBottom: "15px" }}>
                            <label style={{ marginBottom: '5px' }}>Admin Id</label>
                            <input type="text" className="form-control" name="adminId" placeholder="Enter the Admin Id" value={this.state.adminId} onChange={this.handleInputChange}></input>
                        </div>

                        <div className="row">
                            <div className="col md-6">
                                <div className="form-group" style={{ marginBottom: "15px" }}>
                                    <label style={{ marginBottom: '5px' }}>Email Address</label>
                                    <input type="email" className="form-control" name="email" placeholder="Enter email address" value={this.state.email} onChange={this.handleInputChange}></input>
                                </div>
                            </div>

                            <div className="col md-6">
                                <div className="form-group" style={{ marginBottom: "15px" }}>
                                    <label style={{ marginBottom: '5px' }}>Profile Photo</label>
                                    <input type="file" className="form-control" name="img" onChange={this.setFileName}></input>
                                </div>
                            </div>
                        </div>
                        <div className="form-group" style={{ marginBottom: "15px" }}>
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleInputChange}></input>
                            </div>
                        </div>

                        <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>
                            <i className="fa fa-check-square"></i>
                    &nbsp; Create
                    </button>
                    </form>
                    <Alert show={this.state.show} variant="success" onClose={this.setShow} dismissible>
                        <p  style={{ textAlign: "center" }}>Admin Added Successfully <i className="fa fa-check-square"></i></p>
                    </Alert>
                </div>
            </div>
        )
    }
}
