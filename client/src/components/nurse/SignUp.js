import React, { Component } from 'react'
import axios from 'axios';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nurseId: "",
            address: "",
            gender: "",
            img: "",
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

    setFileName = e => {
        this.setState({
            img:e.target.files[0]
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", this.state.name);
        formData.append("nurseId", this.state.nurseId);
        formData.append("address", this.state.address);
        formData.append("gender", this.state.gender);
        formData.append("img", this.state.img);
        formData.append("contact", this.state.contact);
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);

        axios.post("http://localhost:8000/nurses/save", formData).then((res) => {
            if (res.data.success) {
                this.setState({
                    name: "",
                    nurseId: "",
                    address: "",
                    gender: "",
                    img: "",
                    contact: "",
                    email: "",
                    password: ""
                })
                this.props.setToken(res.sessionToken)
                console.log(res)

            }
        })
    }

    render() {
        return (
            <div className="container">
                <h1 className="h3 mb-3 font-weight-normal">Add New Nurse</h1>
                <form className="needs-validation" encType="multipart/form-data">
                    <div className="row">
                        <div className="col md-6">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Name</label>
                                <input type="text" className="form-control" name="name" placeholder="Enter name" value={this.state.name} onChange={this.handleInputChange}></input>
                            </div>
                        </div>

                        <div className="col md-6">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Nurse Id</label>
                                <input type="text" className="form-control" name="nurseId" placeholder="Enter the Nurse Id Number" value={this.state.nurseId} onChange={this.handleInputChange}></input>
                            </div>
                        </div>
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
                                <label style={{ marginBottom: '5px' }}>Profile Photo</label>
                                <input type="file" className="form-control" name="img" onChange={this.setFileName}></input>
                            </div>
                        </div>
                    </div>

                    <div className="row">
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
                        <div className="col md-4">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleInputChange}></input>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>
                        <i className="fa fa-check-square"></i>
                    &nbsp; Create
                    </button>
                </form>
            </div>
        )
    }
}