import React, { Component } from 'react'

import DataTable from "react-data-table-component"
import axios from 'axios'
import Header from './Header';
import { Button, Modal } from 'react-bootstrap';
// import HeaderPrimary from './HeaderPrimary';

export default class GetDonors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donors: [],
            id: "",
            show: false,
            showDetails: false,
            showDonate: false,
            donId: "",
            donor: {},
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
        this.getDonors();
        const id = this.props.id;
        if (id != null) {
            this.setState({
                id: id
            })
        }
        console.log(this.state.id)
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
        const INFO = {
            donorId: this.state.donor._id,
            date: this.state.date,
            bloodType: this.state.donor.bloodType,
            content: parseFloat(this.state.content),
            temperature: parseFloat(this.state.temperature),
            pulse: parseFloat(this.state.pulse),
            bloodPressure: parseFloat(this.state.bloodPressure),
            weight: parseFloat(this.state.weight)
        }

        console.log(INFO);

        axios.post(`http://localhost:8000/mediInfoDonor/save`, INFO).then((res) => {
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

                        if (this.state.donor.bloodType === "A+") {
                            newStock = parseFloat(this.state.stock.Aplus) + parseFloat(INFO.content);
                            STOCK = { Aplus: parseFloat(newStock) }
                        } else if (this.state.donor.bloodType === "A-") {
                            newStock = parseFloat(this.state.stock.Amin) + parseFloat(INFO.content);
                            STOCK = { Amin: parseFloat(newStock) }
                        } else if (this.state.donor.bloodType === "B+") {
                            newStock = parseFloat(this.state.stock.Bplus) + parseFloat(INFO.content);
                            STOCK = { Bplus: parseFloat(newStock) }
                        } else if (this.state.donor.bloodType === "B+") {
                            newStock = parseFloat(this.state.stock.Bplus) + parseFloat(INFO.content);
                            STOCK = { Bmin: parseFloat(newStock) }
                        } else if (this.state.donor.bloodType === "AB+") {
                            newStock = parseFloat(this.state.stock.ABplus) + parseFloat(INFO.content);
                            STOCK = { ABplus: parseFloat(newStock) }
                        } else if (this.state.donor.bloodType === "AB-") {
                            newStock = parseFloat(this.state.stock.ABmin) + parseFloat(INFO.content);
                            STOCK = { ABmin: parseFloat(newStock) }
                        } else if (this.state.donor.bloodType === "O+") {
                            newStock = parseFloat(this.state.stock.Oplus) + parseFloat(INFO.content);
                            STOCK = { Oplus: parseFloat(newStock) }
                        } else if (this.state.donor.bloodType === "O-") {
                            newStock = parseFloat(this.state.stock.Omin) + parseFloat(INFO.content);
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

    handleClose = () => this.setState({
        showDonate: false,
        showDetails: false
    });

    handleShowDonate = (id) => axios.get(`http://localhost:8000/donor/${id}`).then((res) => {
        if (res.data.success) {
            this.setState({
                showDonate: true,
                donor: res.data.donor
            });
        }
    })

    handleShowDonor = (id) => axios.get(`http://localhost:8000/donor/${id}`).then((res) => {
        if (res.data.success) {
            this.setState({
                showDetails: true,
                donor: res.data.donor
            });
        }
    })

    getDonors() {
        axios.get("http://localhost:8000/donors").then(res => {
            if (res.data.success) {
                this.setState({
                    donors: res.data.existingDonors
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
            name: "Profile Photo",
            selector: (row) => <img src={`/uploads/donor/${row.img}`} alt={`../uploads/donor/${row.img}`} style={{ width: "50px" }}></img>
        },
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
            name: "NIC Number",
            selector: (row) => row.nic,
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
            name: "Details",
            selector: (row) => <Button style={{borderRadius: "20px"}} variant="primary" size="sm" onClick={() => this.handleShowDonor(row._id)}>View</Button>
        },
        {
            name: "Donate",
            selector: (row) => <Button style={{borderRadius: "20px",  backgroundColor: "#002D62", color: "white"}} size="sm" onClick={() => this.handleShowDonate(row._id)}>Donate</Button>
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


    filterData(donors, searchKey) {
        const result = donors.filter((donor) =>
            donor.name.toLowerCase().includes(searchKey) || donor.name.toUpperCase().includes(searchKey) ||
            donor.bloodType.toLowerCase().includes(searchKey) || donor.bloodType.toUpperCase().includes(searchKey)
            || donor.address.toLowerCase().includes(searchKey) || donor.address.toUpperCase().includes(searchKey)
        )
        this.setState({
            donors: result
        })
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
        axios.get("http://localhost:8000/donors").then(res => {
            if (res.data.success) {
                this.filterData(res.data.existingDonors, searchKey)
            }
        })
    }

    SearchDonor = <div className="col-lg-3 mt-2 mb-2">
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
                            <h4>All Donors</h4>
                        </div>
                    </div>
                    <DataTable
                        responsive
                        subHeader
                        columns={this.columns}
                        data={this.state.donors}
                        subHeaderComponent={this.SearchDonor}
                        striped={true}
                        highlightOnHover={true}
                        pagination
                        paginationComponent={this.BootyPagination}
                        defaultSortFieldID={1}
                    />
                </div>

                <Modal show={this.state.showDetails} onHide={this.handleClose}>
                    <Modal.Header closeButton style={{ backgroundColor: "#002D62", color: "white" }}>
                        <Modal.Title>Donor Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card" style={{ margin: "20px", border: "none" }}>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>{this.state.donor.name}</h5>
                                        <br></br>
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src={`../../uploads/donor/${this.state.donor.img}`} alt="photo" style={{ width: "25%", height: "25%", marginLeft: "auto", marginRight: "auto" }}></img>
                                        </div>
                                    </div>
                                    <dl className="d-flex align-items-center">
                                        <dl className="row">
                                            <dt className="col-lg-5">Address</dt>
                                            <dd className="col-lg-7">{this.state.donor.address}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">Gender</dt>
                                            <dd className="col-lg-7">{this.state.donor.gender}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">NIC</dt>
                                            <dd className="col-lg-7">{this.state.donor.nic}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">Blood Group</dt>
                                            <dd className="col-lg-7">{this.state.donor.bloodType}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">Contact Number</dt>
                                            <dd className="col-lg-7">{this.state.donor.contact}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">Email</dt>
                                            <dd className="col-lg-7">{this.state.donor.email}</dd>
                                        </dl>
                                    </dl>
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

                <Modal show={this.state.showDonate} onHide={this.handleClose} size="md">
                    <Modal.Header closeButton style={{ backgroundColor: "#002D62", color: "white" }}>
                        <Modal.Title>Donate Blood</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card" style={{ margin: "20px", border: "none" }}>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>{this.state.donor.name}</h5>
                                        <br></br>
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src={`../../uploads/donor/${this.state.donor.img}`} alt="photo" style={{ width: "25%", height: "25%", marginLeft: "auto", marginRight: "auto" }}></img>
                                        </div>
                                    </div>
                                    <div className="col-md-8 mt-4 mx-auto">
                                        <form className="needs-validation" noValidate>
                                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                                <label style={{ marginBottom: '5px' }}>Date</label>
                                                <input type="date" className="form-control" name="date" placeholder="Enter name" value={this.state.date} onChange={this.handleInputChange}></input>
                                            </div>

                                            <div className="form-group" style={{ marginBottom: "15px" }}>
                                                <label style={{ marginBottom: '5px' }}>Blood Type</label>
                                                <input type="text" className="form-control" name="bloodType" disabled="true" value={this.state.donor.bloodType}></input>
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
