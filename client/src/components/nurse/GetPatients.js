import React, { Component } from 'react'
import DataTable from "react-data-table-component"
import axios from 'axios'
import Header from './Header';
// import HeaderPrimary from './HeaderPrimary';
import { Button, Modal } from 'react-bootstrap';

export default class GetPatients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            id: "",
            show: false,
            showDetails: false,
            patientId: "",
            patient: {},
            stock: {},
            date: "",
            content: 0,
            temperature: 0,
            pulse: 0,
            bloodPressure: 0,
            weight: 0,
            error: ""
        }
    }

    componentDidMount() {
        this.getPatients();
    }

    onSubmit = (e) => {
        e.preventDefault();
        const INFO = {
            patientId: this.state.patient._id,
            date: this.state.date,
            bloodType: this.state.patient.bloodType,
            content: parseFloat(this.state.content),
            temperature: parseFloat(this.state.temperature),
            pulse: parseFloat(this.state.pulse),
            bloodPressure: parseFloat(this.state.bloodPressure),
            weight: parseFloat(this.state.weight)
        }

        console.log(INFO);

        axios.post(`http://localhost:8000/mediInfoPatient/save`, INFO).then((res) => {
            if (res.data.success) {
                this.setState({
                    date: "",
                    content: 0,
                    temperature: 0,
                    pulse: 0,
                    bloodPressure: 0,
                    weight: 0,
                    error: ""
                })
                axios.get(`http://localhost:8000/bloodTypes/625180fb86e97f491d23ff7f`).then((res) => {
                    if (res.data.success) {
                        this.setState({
                            stock: res.data.stock,
                        });
                        var newStock = 0;
                        let STOCK = null;

                        if (this.state.patient.bloodType === "A+") {
                            newStock = parseFloat(this.state.stock.Aplus) - parseFloat(INFO.content);
                            STOCK = { Aplus: parseFloat(newStock) }
                        } else if (this.state.patient.bloodType === "A-") {
                            newStock = parseFloat(this.state.stock.Amin) - parseFloat(INFO.content);
                            STOCK = { Amin: parseFloat(newStock) }
                        } else if (this.state.patient.bloodType === "B+") {
                            newStock = parseFloat(this.state.stock.Bplus) - parseFloat(INFO.content);
                            STOCK = { Bplus: parseFloat(newStock) }
                        } else if (this.state.patient.bloodType === "B+") {
                            newStock = parseFloat(this.state.stock.Bplus) - parseFloat(INFO.content);
                            STOCK = { Bmin: parseFloat(newStock) }
                        } else if (this.state.patient.bloodType === "AB+") {
                            newStock = parseFloat(this.state.stock.ABplus) - parseFloat(INFO.content);
                            STOCK = { ABplus: parseFloat(newStock) }
                        } else if (this.state.patient.bloodType === "AB-") {
                            newStock = parseFloat(this.state.stock.ABmin) - parseFloat(INFO.content);
                            STOCK = { ABmin: parseFloat(newStock) }
                        } else if (this.state.patient.bloodType === "O+") {
                            newStock = parseFloat(this.state.stock.Oplus) - parseFloat(INFO.content);
                            STOCK = { Oplus: parseFloat(newStock) }
                        } else if (this.state.patient.bloodType === "O-") {
                            newStock = parseFloat(this.state.stock.Omin) - parseFloat(INFO.content);
                            STOCK = { Omin: parseFloat(newStock) }
                        }
                        axios.put(`http://localhost:8000/bloodTypes/update/625180fb86e97f491d23ff7f`, STOCK).then((res) => {
                            if (res.data.success) {
                                window.location.replace("http://localhost:3000/nurse/donations");
                            }
                        })

                    }
                });
            }

            else if (res.data.error) {
                this.setState({
                    error: "Something went wrong. Please try agin later."
                })
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

    handleClose = () => this.setState({
        show: false,
        showDetails: false
    });

    handleShowPatient = (id) => axios.get(`http://localhost:8000/patient/${id}`).then((res) => {
        if (res.data.success) {
            this.setState({
                showDetails: true,
                patient: res.data.patient
            });
        }
    })

    getPatients() {
        axios.get("http://localhost:8000/patients").then(res => {
            if (res.data.success) {
                this.setState({
                    patients: res.data.existingPatients
                });
            }
        })
    }

    getNumberOfPages(rowCount, rowsPerPage) {
        return Math.ceil(rowCount / rowsPerPage);
    }

    toPages(pages) {
        const results = [];

        for (let i = 1; i <= pages; i++) {
            results.push(i);
        }

        return results;
    }

    columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Address",
            selector: (row) => row.address,
            sortable: true
        },
        {
            name: "Gender",
            selector: (row) => row.gender,
            sortable: true
        },
        {
            name: "Age",
            selector: (row) => row.age,
            sortable: true
        },
        {
            name: "Blood Type",
            selector: (row) => row.bloodType,
            sortable: true
        },
        {
            name: "Contact Number",
            selector: (row) => row.contact
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true
        },
        {
            name: "Donate",
            selector: (row) => <Button style={{ borderRadius: "20px",backgroundColor: "#002D62", color: "white" }} variant="primary" size="sm" onClick={() => this.handleShowPatient(row._id)}>Donate</Button>
        }
    ]


    BootyPagination = ({
        rowsPerPage,
        rowCount,
        onChangePage,
        currentPage
    }) => {
        const handleBackButtonClick = () => {
            onChangePage(currentPage - 1);
        };

        const handleNextButtonClick = () => {
            onChangePage(currentPage + 1);
        };

        const handlePageNumber = (e) => {
            onChangePage(Number(e.target.value));
        };

        const pages = this.getNumberOfPages(rowCount, rowsPerPage);
        const pageItems = this.toPages(pages);
        const nextDisabled = currentPage === pageItems.length;
        const previosDisabled = currentPage === 1;


        return (
            <nav>
                <br></br>
                <ul className="pagination">
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={handleBackButtonClick}
                            disabled={previosDisabled}
                            aria-disabled={previosDisabled}
                            aria-label="previous page"
                        >
                            Previous
                </button>
                    </li>
                    {pageItems.map((page) => {
                        const className =
                            page === currentPage ? "page-item active" : "page-item";

                        return (
                            <li key={page} className={className}>
                                <button
                                    className="page-link"
                                    onClick={handlePageNumber}
                                    value={page}
                                >
                                    {page}
                                </button>
                            </li>
                        );
                    })}
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={handleNextButtonClick}
                            disabled={nextDisabled}
                            aria-disabled={nextDisabled}
                            aria-label="next page"
                        >
                            Next
                </button>
                    </li>
                </ul>
            </nav>
        );
    };


    filterData(patients, searchKey) {
        const result = patients.filter((patient) =>
            patient.name.toLowerCase().includes(searchKey) || patient.name.toUpperCase().includes(searchKey)
        )
        this.setState({
            patients: result
        })
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
        axios.get("http://localhost:8000/patient").then(res => {
            if (res.data.success) {
                this.filterData(res.data.existingPatients, searchKey)
            }
        })
    }

    SearchPatient = <div className="col-lg-3 mt-2 mb-2">
        <input className="form-control" type="search" placeholder="Search" onChange={this.handleSearchArea}></input>
    </div>


    render() {
        return (
            <div>
                {/* <HeaderPrimary/> */}
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mt-2 mb-2">
                            <h4>All Patients</h4>
                        </div>
                    </div>
                    <DataTable
                        responsive
                        subHeader
                        columns={this.columns}
                        data={this.state.patients}
                        subHeaderComponent={this.SearchPatient}
                        striped={true}
                        highlightOnHover={true}
                        pagination
                        paginationComponent={this.BootyPagination}
                        defaultSortFieldID={1}
                    />
                </div>

                <Modal show={this.state.showDetails} onHide={this.handleClose}>
                    <Modal.Header closeButton style={{ backgroundColor: "#002D62", color: "white" }}>
                        <Modal.Title>Receive Blood</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card" style={{ margin: "20px", border: "none" }}>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>{this.state.patient.name}</h5>
                                        <br></br>
                                    </div>
                                    <div className="col-md-8 mt-4 mx-auto">
                                        <form className="needs-validation" noValidate>
                                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                                <label style={{ marginBottom: '5px' }}>Date</label>
                                                <input type="date" className="form-control" name="date" placeholder="Enter name" value={this.state.date} onChange={this.handleInputChange}></input>
                                            </div>

                                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                                <label style={{ marginBottom: '5px' }}>Blood Type</label>
                                                <input type="text" className="form-control" name="bloodType" disabled="true" value={this.state.patient.bloodType}></input>
                                            </div>

                                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                                <label style={{ marginBottom: '5px' }}>Content</label>
                                                <input type="text" className="form-control" name="content" placeholder="Enter content" value={this.state.content} onChange={this.handleInputChange}></input>
                                            </div>

                                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                                <label style={{ marginBottom: '5px' }}>Temperature (in celsius)</label>
                                                <input type="text" className="form-control" name="temperature" placeholder="Enter temperature" value={this.state.temperature} onChange={this.handleInputChange}></input>
                                            </div>

                                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                                <label style={{ marginBottom: '5px' }}>Pulse (per minute)</label>
                                                <input type="text" className="form-control" name="pulse" placeholder="Enter pulse" value={this.state.pulse} onChange={this.handleInputChange}></input>
                                            </div>

                                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                                <label style={{ marginBottom: '5px' }}>Blood Pressure (mmHg)</label>
                                                <input type="text" className="form-control" name="bloodPressure" placeholder="Enter bloodPressure" value={this.state.bloodPressure} onChange={this.handleInputChange}></input>
                                            </div>

                                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                                <label style={{ marginBottom: '5px' }}>Weight (Kg)</label>
                                                <input type="text" className="form-control" name="weight" placeholder="Enter weight" value={this.state.weight} onChange={this.handleInputChange}></input>
                                            </div>
                                            {this.state.error ? (<div className="alert alert-danger">{this.state.error}</div>) : null}

                                            <div className="d-grid">
                                                <button className="btn" type="submit" style={{ marginTop: '15px', backgroundColor: "#002D62", color: "white" }} onClick={this.onSubmit}>
                                                    Donate <i class="fa fa-heartbeat" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}
