import React, { Component } from 'react'
import axios from 'axios'

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            gender: "",
            nic: "",
            bloodType: "",
            contact: "",
            email: "",
            err: ""
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get(`http://localhost:8000/donor/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    name: res.data.donor.name,
                    address: res.data.donor.address,
                    gender: res.data.donor.gender,
                    nic: res.data.donor.nic,
                    bloodType: res.data.donor.bloodType,
                    contact: res.data.donor.contact,
                    email: res.data.donor.email
                });

            }
        })
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

        const id = this.props.match.params.id;

        const { name, address, gender, nic, bloodType, contact, email } = this.state;

        const DONOR = {
            name: name,
            address: address,
            gender: gender,
            nic: nic,
            bloodType: bloodType,
            contact: contact,
            email: email
        }

        console.log(DONOR);

        axios.put(`http://localhost:8000/donors/update/${id}`, DONOR).then((res) => {
            if (res.data.success) {
                this.setState({
                    name: "",
                    address: "",
                    gender: "",
                    nic: "",
                    bloodType: "",
                    contact: "",
                    email: "",
                    err: ""
                })

                window.location.replace("http://localhost:3000/donor/home");
            }
            else {
                this.setState({
                    err: "Something went wrong. Please try again later."
                })
            }
        })
    }


    render() {
        return (
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Edit Donor</h1>
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
                        <div className="col md-4">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Gender</label>
                                <select value={this.state.gender} onChange={this.handleInputChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="col md-6">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>NIC Number</label>
                                <input type="text" className="form-control" name="nic" placeholder="Enter nic number" value={this.state.nic} onChange={this.handleInputChange}></input>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col md-4">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Blood Type</label>
                                <select value={this.state.bloodType} onChange={this.handleInputChange}>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>
                        </div>
                        <div className="col md-4">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Contact Number</label>
                                <input type="text" className="form-control" name="contact" placeholder="Enter contact number" value={this.state.contact} onChange={this.handleInputChange}></input>
                            </div>
                        </div>

                        <div className="col md-4">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Email Address</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter email address" value={this.state.email} onChange={this.handleInputChange}></input>
                            </div>
                        </div>
                    </div>
                    {this.state.error ? (<div className="alert alert-danger">{this.state.error}</div>) : null}

                    <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>
                        Update <i className="fa fa-check-square"></i>
                    </button>
                </form>
            </div>
        )
    }
}
