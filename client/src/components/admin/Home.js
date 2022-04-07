import React, { Component } from 'react'
import axios from 'axios';
import Navbar from './Navbar'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: {}
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/admin/dashboard/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    admin: res.data.admin
                });
                console.log(this.state.admin);
            }
        })
    }
    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card" style={{ margin: "20px" }}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>{this.state.admin.name}</h5>
                                    <br></br>
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={`../../uploads/admin/${this.state.admin.img}`} alt="photo" style={{ width: "15%", height: "15%", marginLeft: "auto", marginRight: "auto" }}></img>

                                        <div className="mt-6">
                                            <a className="btn btn-success " href={`/admin/edit/${this.state.admin._id}`}>
                                                <i className="fas fa-edit"></i>&nbsp;Edit Profile</a>&nbsp;
                                            <a className="btn btn-primary " href={`/admin/password/update/${this.state.admin._id}`}>
                                                <i className="fas fa-camera"></i>&nbsp;Change Profile Photo</a>&nbsp;
                                            <a className="btn btn-warning " href={`/admin/password/update/${this.state.admin._id}`}>
                                                <i className="fas fa-unlock"></i>&nbsp;Change Password</a>&nbsp;
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
                    </div>
                </div>
            </div>
        )
    }
}
