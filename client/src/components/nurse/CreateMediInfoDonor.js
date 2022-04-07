import React, { Component } from 'react'
import axios from 'axios';
import donor from '../../../../backend/models/donor';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donorId:"",
            date: "",
            bloodType: "",
            temperature: "",
            pulse: "",
            bloodPressure: "",
            weight: "",
            donor:{}
        }
    }

    componentDidMount() {
        const donorId = this.props.match.params.id;

        axios.get(`http://localhost:8000/donor/${donorId}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    donor: res.data.donor
                });
                console.log(donor);
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

        const {donorId, date, bloodType, temperature, pulse, bloodPressure, weight } = this.state;

        const INFO = {
            donorId:donorId,
            date: date,
            bloodType: bloodType,
            temperature: parseFloat(temperature),
            pulse: parseFloat(pulse),
            bloodPressure: parseFloat(bloodPressure),
            weight: parseFloat(weight)
        }

        console.log(INFO);

        axios.post("http://localhost:8000/mediInfoDonor/save", INFO).then((res) => {
            if (res.data.success) {
                this.setState({
                    donorId:"",
                    date: "",
                    bloodType: "",
                    temperature: "",
                    pulse: "",
                    bloodPressure: "",
                    weight: ""
                })
                console.log(res)

            }
        })
    }

    render() {
        return (
            <div className="container">
                <h1 className="h3 mb-3 font-weight-normal">Add New Information About Blood Donation</h1>
                <form className="needs-validation" noValidate>
                <div className="row">
                        <div className="col md-6">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Date</label>
                                <input type="text" className="form-control" name="date" placeholder="Enter date" value={this.state.date} onChange={this.handleInputChange}></input>
                            </div>
                        </div>
                        <div className="col md-6">
                        <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Blood Type</label>
                                <input type="text" className="form-control" name="bloodType" placeholder="Enter blood type" value={this.state.bloodType} onChange={this.handleInputChange}></input>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col md-6">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Temperature(C)</label>
                                <input type="number" className="form-control" name="temperature" placeholder="Enter the temperature in celsius" value={this.state.temperature} onChange={this.handleInputChange}></input>
                            </div>
                        </div>
                        <div className="col md-6">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Pulse</label>
                                <input type="number" className="form-control" name="pulse" placeholder="Enter the pulse" value={this.state.pulse} onChange={this.handleInputChange}></input>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col md-6">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Blood Pressure</label>
                                <input type="number" className="form-control" name="bloodPressue" placeholder="Enter Blood Pressue" value={this.state.bloodPressue} onChange={this.handleInputChange}></input>
                            </div>
                        </div>
                        <div className="col md-6">
                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                <label style={{ marginBottom: '5px' }}>Weight(Kg)</label>
                                <input type="number" className="form-control" name="weight" placeholder="Enter weight" value={this.state.weight} onChange={this.handleInputChange}></input>
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
