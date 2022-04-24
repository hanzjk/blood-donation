import React, { Component } from 'react'

import DataTable from "react-data-table-component"
import axios from 'axios'
import Header from './Header';
import HeaderPrimary from './HeaderPrimary';
import { Button, Modal } from 'react-bootstrap';

export default class GetNurses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donors: [],
            id: "",
            show: false,
            showDetails: false,
            nurseId: "",
            nurse: {}
        }
    }

    handleClose = () => this.setState({
        show: false,
        showDetails: false
    });
    handleShowDelete = (id) => this.setState({
        show: true,
        donId: id
    });

    handleShowNurse = (id) => axios.get(`http://localhost:8000/nurse/${id}`).then((res) => {
        if (res.data.success) {
            this.setState({
                showDetails: true,
                nurse: res.data.nurse
            });

            console.log(this.state.nurse);
        }
    })

    onDelete = (id) => {
        axios.delete(`http://localhost:8000/nurses/delete/${id}`).then(res => {
            this.getNurses();
            this.handleClose();
        })
    }
    componentDidMount() {
        this.getNurses();
    }

    getNurses() {
        axios.get("http://localhost:8000/nurses").then(res => {
            if (res.data.success) {
                this.setState({
                    nurses: res.data.existingNurses
                });
                console.log(this.state.nurses);
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
            selector: (row) => <img src={`/uploads/nurse/${row.img}`} alt={`../uploads/nurse/${row.img}`} style={{ width: "50px" }}></img>
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Nurse ID",
            selector: (row) => row.nurseId,
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
            name: "Contact Number",
            selector: (row) => row.contact
        },
        {
            name: "Email Address",
            selector: (row) => row.email,
            sortable: true
        },
        {
            name: "Delete",
            selector: (row) => <Button variant="danger" size="sm" onClick={() => this.handleShowDelete(row._id)}>Delete</Button>
        },
        {
            name: "View",
            selector: (row) => <Button variant="primary" size="sm" onClick={() => this.handleShowNurse(row._id)}>View</Button>
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



    filterData(nurses, searchKey) {
        const result = nurses.filter((nurse) =>
            nurse.name.toLowerCase().includes(searchKey) || nurse.name.toUpperCase().includes(searchKey)
        )
        this.setState({
            nurses: result
        })
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
        axios.get("http://localhost:8000/nurses").then(res => {
            if (res.data.success) {
                this.filterData(res.data.existingNurses, searchKey)
            }
        })
    }

    SearchNurse = <div className="col-lg-3 mt-2 mb-2">
        <input className="form-control" type="search" placeholder="Search" onChange={this.handleSearchArea}></input>
    </div>


    render() {
        return (
            <div>
                <HeaderPrimary/>
               <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mt-2 mb-2">
                            <h4>All Nurses</h4>
                        </div>
                    </div>
                    <DataTable
                        responsive
                        subHeader
                        columns={this.columns}
                        data={this.state.nurses}
                        subHeaderComponent={this.SearchNurse}
                        striped={true}
                        highlightOnHover={true}
                        pagination
                        paginationComponent={this.BootyPagination}
                        defaultSortFieldID={1}
                    />
                </div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton style={{ backgroundColor: "#C41E3A", color: "white" }}>
                        <Modal.Title> Delete Nurse</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: "center" }}>Delete this nurse?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.onDelete(this.state.nurseId)}>
                            Yes
                        </Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showDetails} onHide={this.handleClose}>
                    <Modal.Header style={{ backgroundColor: "#002D62", color: "white" }}>
                        <Modal.Title>Nurse Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card" style={{ margin: "20px", border: "none" }}>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>{this.state.nurse.name}</h5>
                                        <br></br>
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src={`../../uploads/nurse/${this.state.nurse.img}`} alt="photo" style={{ width: "25%", height: "25%", marginLeft: "auto", marginRight: "auto" }}></img>
                                        </div>
                                    </div>
                                    <dl className="d-flex align-items-center">
                                        <dl className="row">
                                            <dt className="col-lg-5">Nurse ID</dt>
                                            <dd className="col-lg-7">{this.state.nurse.nurseId}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">Address</dt>
                                            <dd className="col-lg-7">{this.state.nurse.address}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">Gender</dt>
                                            <dd className="col-lg-7">{this.state.nurse.gender}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">Contact Number</dt>
                                            <dd className="col-lg-7">{this.state.nurse.contact}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">Email</dt>
                                            <dd className="col-lg-7">{this.state.nurse.email}</dd>
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
