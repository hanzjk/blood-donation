import React, { Component } from 'react'
import axios from 'axios'

export default class UpdatePassword extends Component {
    constructor(props){
        super(props);
        this.state={
            password:"",
            rePassword:""
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

        const id = this.props.match.params.id;

        const { password, rePassword} = this.state;

        const data = {
            password: password,
            rePassword: rePassword
        }

        console.log(data);

        axios.put(`http://localhost:8000/admin/password/update/${id}`, data).then((res) => {
            if (res.data.success) {

                this.setState({
                    password: "",
                    rePassword: ""
                });
                window.location.replace("/");
            }
        })
    }


    render() {
        return (
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Change Password</h1>
                <form className="needs-validation" noValidate>
                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: '5px' }}>Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter index no" value={this.state.password} onChange={this.handleInputChange}></input>
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: '5px' }}>Reenter Password</label>
                        <input type="password" className="form-control" name="rePassword" placeholder="Enter rePassword" value={this.state.rePassword} onChange={this.handleInputChange}></input>
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
