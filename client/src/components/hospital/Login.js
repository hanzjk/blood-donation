import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitalName: "",
            password: "",
            error: ""
        };
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

        const { hospitalName, password, error } = this.state;

        const data = {
            hospitalName: hospitalName,
            password: password,
            error: error
        }

        console.log(data);

        axios.post("http://localhost:8000/hospital/login", data).then((res) => {
            if (res.data.success) {
                this.setState({
                    hospitalName: "",
                    password: "",
                    error: ""
                });
                console.log("Password matched");
                localStorage.setItem("hospitalToken", res.data.token);
                this.props.history.push(`/hospital/home`)
            }
            else {
                if (res.data.messageUser) {
                    this.setState({
                        error: res.data.messageUser
                    })
                }

                else if (res.data.messagePassword) {
                    this.setState({
                        error: res.data.messagePassword
                    })
                }
                this.props.setToken(data.sessionToken)
                console.log(error);
            }

        })
    }


    render() {
        return (
            <div className="container">
                <div className="col-md-8 mt-4 mx-auto">
                    <h1 className="h3 mb-3 font-weight-normal">Hospital Login</h1>
                    <form className="needs-validation" noValidate>
                        <div className="form-group" style={{ marginBottom: "15px" }}>
                            <label style={{ marginBottom: '5px' }}>Email Address</label>
                            <input type="text" className="form-control" name="hospitalName" placeholder="Enter email address" value={this.state.hospitalName} onChange={this.handleInputChange}></input>
                        </div>

                        <div className="form-group" style={{ marginBottom: "15px" }}>
                            <label style={{ marginBottom: '5px' }}>Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Enter the password" value={this.state.password} onChange={this.handleInputChange}></input>
                        </div>
                        {this.state.error ? (<div className="alert alert-danger">{this.state.error}</div>) : (null)}

                        <button className="btn btn-primary" type="submit" style={{ marginTop: '15px', width: '100%' }} onClick={this.onSubmit}>
                            &nbsp; Login
                        </button>
                    </form>
                    <br></br>
                </div>
            </div>
        )
    }
}
