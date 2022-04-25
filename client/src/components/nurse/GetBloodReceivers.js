import React, { Component } from 'react'
import DataTable from "react-data-table-component"
import axios from 'axios'
import Header from './Header';
import { Button, Modal } from 'react-bootstrap';
// import HeaderPrimary from './HeaderPrimary';

export default class GetBloodReceivers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediInfo: [],
            show: false,
            showDetails: false,
            patient: {}
        }
    }

    componentDidMount() {
        this.getInfo();
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

            console.log(this.state.patient);
        }
    })

    getInfo() {
        axios.get("http://localhost:8000/mediInfoPatients").then(res => {
            if (res.data.success) {
                this.setState({
                    mediInfo: res.data.existingInfo
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

    BloodType = (bType) => {
        if (bType === "O+" || bType === "O-")
            return (<Button disabled="true" style={{ color: "white", borderRadius: "20px" }} size="sm" variant="warning">{bType}</Button>)

        else if (bType === "AB+" || bType === "AB-")
            return (<Button disabled="true" style={{ color: "white", borderRadius: "20px" }} size="sm" variant="danger">{bType}</Button>)

        else if (bType === "A+" || bType === "A-")
            return (<Button disabled="true" style={{ color: "white", borderRadius: "20px" }} size="sm" variant="success">{bType}</Button>)

        else if (bType === "B+" || bType === "B-")
            return (<Button disabled="true" style={{ color: "white", borderRadius: "20px" }} size="sm" variant="secondary">{bType}</Button>)
    }

    columns = [
        {
            name: "Receiver",
            selector: (row) => <Button style={{ backgroundColor: "#002D62", color: "white", borderRadius: "20px" }} size="sm" onClick={() => this.handleShowPatient(row.patientId)}>View</Button>
        },
        {
            name: "Received Date",
            selector: (row) => row.date,
            sortable: true
        },
        {
            name: "Blood Type",
            selector: (row) => this.BloodType(row.bloodType),
            sortable: true
        },
        {
            name: "Content",
            selector: (row) => row.content,
            sortable: true
        },
        {
            name: "Temperature(C)",
            selector: (row) => row.temperature,
            sortable: true
        },
        {
            name: "Pulse(per min)",
            selector: (row) => row.pulse
        },
        {
            name: "Pressure (mmHg)",
            selector: (row) => row.bloodPressure,
            sortable: true
        },
        {
            name: "Weight(kg)",
            selector: (row) => row.weight,
            sortable: true
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


    filterData(mediInfo, searchKey) {
        const result = mediInfo.filter((info) =>
            info.date.toLowerCase().includes(searchKey) || info.date.toUpperCase().includes(searchKey) ||
            info.bloodType.toLowerCase().includes(searchKey) || info.bloodType.toUpperCase().includes(searchKey)
        )
        this.setState({
            mediInfo: result
        })
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
        axios.get("http://localhost:8000/mediInfoPatients").then(res => {
            if (res.data.success) {
                this.filterData(res.data.existingInfo, searchKey)
            }
        })
    }

    SearchInfo = <div className="col-lg-3 mt-2 mb-2">
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
                            <h4>All Donations to Receivers</h4>
                        </div>
                    </div>
                    <DataTable
                        responsive
                        subHeader
                        columns={this.columns}
                        data={this.state.mediInfo}
                        subHeaderComponent={this.SearchInfo}
                        striped={true}
                        highlightOnHover={true}
                        pagination
                        paginationComponent={this.BootyPagination}
                        defaultSortFieldID={1}
                    />
                </div>
                <Modal show={this.state.showDetails} onHide={this.handleClose}>
                    <Modal.Header style={{ backgroundColor: "#002D62", color: "white" }}>
                        <Modal.Title>Receiver Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card" style={{ margin: "20px", border: "none" }}>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>{this.state.patient.name}</h5>
                                        <br></br>
                                    </div>
                                    <dl className="d-flex align-items-center">
                                        <dl className="row">
                                            <dt className="col-lg-5">Address</dt>
                                            <dd className="col-lg-7">{this.state.patient.address}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">Gender</dt>
                                            <dd className="col-lg-7">{this.state.patient.gender}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">Age</dt>
                                            <dd className="col-lg-7">{this.state.patient.age}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">Blood Group</dt>
                                            <dd className="col-lg-7">{this.state.patient.bloodType}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">Contact Number</dt>
                                            <dd className="col-lg-7">{this.state.patient.contact}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">Email</dt>
                                            <dd className="col-lg-7">{this.state.patient.email}</dd>
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
            </div>
        )
    }
}
