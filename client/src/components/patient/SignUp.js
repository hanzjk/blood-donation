import React, { Component } from 'react'
import axios from 'axios';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            gender:"",
            age:"",
            address: "",
            bloodType: "",
            contact: "",
            email: "",
            password: ""
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, gender, age, address, bloodType, contact, email, password } = this.state;

        const PATIENT = {
            name: name,
            gender: gender,
            age: parseInt(age),
            address: address,
            bloodType: bloodType,
            contact: contact,
            email: email,
            password: password,
        }

        console.log(PATIENT);

        axios.post("http://localhost:8000/patients/save", PATIENT).then((res) => {
            if (res.data.success) {
                this.setState({
                    name: "",
                    gender:"",
                    age:"",
                    address: "",
                    bloodType: "",
                    contact: "",
                    email: "",
                    password: ""
                })
                this.props.setToken(res.sessionToken)
            }
        })
    }

    render() {
        return (
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Create a Patient Account</h1>
                <form className="needs-validation" noValidate>
                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: '5px' }}>Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Enter name" value={this.state.name} onChange={this.handleInputChange}></input>
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: '5px' }}>Address</label>
                        <input type="text" className="form-control" name="address" placeholder="Enter address" value={this.state.address} onChange={this.handleInputChange}></input>
                    </div>

                    <div className="row">
                        <div className="col md-6">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Gender</label>
                                <select value={this.state.gender} onChange={this.handleInputChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {/* <input type="text" className="form-control" name="gender" placeholder="Enter blood type" value={this.state.gender} onChange={this.handleInputChange}></input> */}
                            </div>
                        </div>
                        <div className="col md-6">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Age</label>
                                <input type="text" className="form-control" name="age" placeholder="Enter the age" value={this.state.age} onChange={this.handleInputChange}></input>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col md-6">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Blood Type</label>
                                <input type="text" className="form-control" name="bloodType" placeholder="Enter blood type" value={this.state.bloodType} onChange={this.handleInputChange}></input>
                            </div>
                        </div>
                        <div className="col md-6">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Contact Number</label>
                                <input type="text" className="form-control" name="contact" placeholder="Enter contact number" value={this.state.contact} onChange={this.handleInputChange}></input>
                            </div>
                        </div>
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
                                <label style={{ marginBottom: '5px' }}>Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleInputChange}></input>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>
                        <i className="fa fa-check-square"></i>
                    &nbsp; Create Account
                    </button>
                </form>
            </div>
        )
    }
}
