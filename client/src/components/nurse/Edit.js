import React, { Component } from 'react'
import axios from 'axios'

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nurseId: "",
            address: "",
            gender: "",
            contact: "",
            email: ""
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get(`http://localhost:8000/nurse/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    name: res.data.nurse.name,
                    nurseId: res.data.nurse.nurseId,
                    address: res.data.nurse.address,
                    gender: res.data.nurse.gender,
                    contact: res.data.nurse.contact,
                    email: res.data.nurse.email
                });

                console.log(this.state.nurse);
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

        const { name, nurseId, address, gender, contact, email } = this.state;

        const NURSE = {
            name: name,
            nurseId: nurseId,
            address: address,
            gender: gender,
            contact: contact,
            email: email
        }

        console.log(NURSE);

        axios.put(`http://localhost:8000/nurses/update/${id}`, NURSE).then((res) => {
            if (res.data.success) {
                this.setState({
                    name: "",
                    nurseId: "",
                    address: "",
                    gender: "",
                    contact: "",
                    email: ""
                })
                window.location.replace("/");
            }
        })
    }


    render() {
        return (
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Edit Nurse</h1>
                <form className="needs-validation" noValidate>
                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: '5px' }}>Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Enter name" value={this.state.name} onChange={this.handleInputChange}></input>
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: '5px' }}>Nurse ID</label>
                        <input type="text" className="form-control" name="nurseId" placeholder="Enter Nurse Id" value={this.state.nurseId} onChange={this.handleInputChange}></input>
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
                                {/* <input type="text" className="form-control" name="bloodType" placeholder="Enter blood type" value={this.state.bloodType} onChange={this.handleInputChange}></input> */}
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

                    <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>
                        <i className="fa fa-check-square"></i>
                        &nbsp; Update
                        </button>
                </form>
            </div>
        )
    }
}
