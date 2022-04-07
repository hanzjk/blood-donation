import React, { Component } from 'react'
import axios from 'axios';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
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

        const { name, address, contact, email, password } = this.state;

        const HOSPITAL = {
            name: name,
            address: address,
            contact: contact,
            email: email,
            password: password,
        }

        console.log(HOSPITAL);

        axios.post("http://localhost:8000/hospitals/save", HOSPITAL).then((res) => {
            if (res.data.success) {
                this.setState({
                    name: "",
                    address: "",
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
                <h1 className="h3 mb-3 font-weight-normal">Add New Hospital</h1>
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
                    &nbsp; Save
                    </button>
                </form>
            </div>
        )
    }
}
