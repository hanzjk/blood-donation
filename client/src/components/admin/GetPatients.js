import React, { Component } from 'react'
import DataTable from "react-data-table-component"
import axios from 'axios'
import Navbar from './Navbar';
import { Button, Modal } from 'react-bootstrap';

export default class GetPatients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            id: "",
            show: false,
            showDetails:false,
            patientId:"",
            patient:{}
        }
    }

    componentDidMount() {
        this.getPatients();
        const id = this.props.id;
        if (id != null) {
            this.setState({
                id: id
            })
        }
        console.log(this.state.id)
    }

    handleClose = () => this.setState({
        show: false,
        showDetails:false
    });
    handleShowDelete = (id) => this.setState({
        show: true,
        patientId:id
    });

    handleShowPatient = (id) => axios.get(`http://localhost:8000/patient/${id}`).then((res) => {
        if (res.data.success) {
            this.setState({
                showDetails:true,
                patient:res.data.patient
            });

            console.log(this.state.patient);
        }
    })

    onDelete = (id) => {
        axios.delete(`http://localhost:8000/patients/delete/${id}`).then(res => {
            this.getPatients();
            this.handleClose();
        })
    }

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
            name: "Delete",
            selector: (row) =><Button variant="danger" size="sm" onClick={()=>this.handleShowDelete(row._id)}>Delete</Button>
        },
        {
            name: "View",
            selector: (row) =><Button variant="primary" size="sm" onClick={()=>this.handleShowPatient(row._id)}>View</Button>
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
                <Navbar id={this.state.id} />
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
                
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Delete Patient</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign:"center"}}>Delete this patient?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.onDelete(this.state.patientId)}>
                            Yes
                        </Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showDetails} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Patient Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card" style={{ margin: "20px" , border:"none"}}>
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
