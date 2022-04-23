import React, { Component } from 'react'
import axios from 'axios'
import Header from './Header';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            adminId: "",
            email: "",
            error: ""
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get(`http://localhost:8000/admin/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    name: res.data.admin.name,
                    adminId: res.data.admin.adminId,
                    email: res.data.admin.email
                });

                console.log(this.state.admin);
            }
            else {
                this.setState({
                    error: "Something went wrong. Please try again later."
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

        const { name, adminId, email } = this.state;

        const ADMIN = {
            name: name,
            adminId: adminId,
            email: email
        }

        console.log(ADMIN);

        axios.put(`http://localhost:8000/admins/update/${id}`, ADMIN).then((res) => {
            if (res.data.success) {
                this.setState({
                    name: "",
                    adminId: "",
                    email: "",
                    error: ""
                })
                window.location.replace("http://localhost:3000/admin/home");
            }

            else if (res.data.error) {
                this.setState({
                    error: "Something went wrong. Please try agin later."
                })
            }
        })
    }


    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="col-md-8 mx-auto">
                        <div className="row">
                            <div className="card mt-4" style={{ border: "none" }}>
                                <h1 className="h3 mb-3 font-weight-normal">Edit Admin</h1>
                                <form className="needs-validation  align-items-center" noValidate>
                                    <div className="form-group" style={{ marginBottom: "15px" }}>
                                        <label style={{ marginBottom: '5px' }}>Name</label>
                                        <input type="text" className="form-control" name="name" placeholder="Enter name" value={this.state.name} onChange={this.handleInputChange}></input>
                                    </div>

                                    <div className="form-group" style={{ marginBottom: "15px" }}>
                                        <label style={{ marginBottom: '5px' }}>Admin Id</label>
                                        <input type="text" className="form-control" name="adminId" placeholder="Enter Admin Id" value={this.state.adminId} onChange={this.handleInputChange}></input>
                                    </div>

                                    <div className="form-group" style={{ marginBottom: "15px" }}>
                                        <label style={{ marginBottom: '5px' }}>Email Address</label>
                                        <input type="email" className="form-control" name="email" placeholder="Enter email address" value={this.state.email} onChange={this.handleInputChange}></input>
                                    </div>

                                    {this.state.error ? (<div className="alert alert-danger">{this.state.error}</div>) : null}

                                    <div className="d-grid">
                                        <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>
                                            <i className="fa fa-check-square"></i>
                                        &nbsp; Update
                                         </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
