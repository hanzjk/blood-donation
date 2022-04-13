import React, { Component } from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import Header from './Header';
import { Button, Modal } from 'react-bootstrap';


export default class Get extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admins: [],
            admin:{}
        }
    }

    componentDidMount() {
        this.getAdmins();
    }

    handleClose = () => this.setState({
        show: false,
        showDetails: false
    });

    handleShowAdmin = (id) => axios.get(`http://localhost:8000/admin/${id}`).then((res) => {
        if (res.data.success) {
            this.setState({
                showDetails: true,
                admin: res.data.admin
            });

            console.log(this.state.admin);
        }
    })

    getAdmins() {
        axios.get("http://localhost:8000/admins").then(res => {
            if (res.data.success) {
                this.setState({
                    admins: res.data.existingAdmins
                });
                console.log(this.state.admins);
            }
        })
    }

    getNumberOfPages(rowCount, rowsPerPage) {
        return Math.ceil(rowCount / rowsPerPage);
    }

    toPages(pages) {
        const results = [];

        for (let i = 1; i < pages; i++) {
            results.push(i);
        }

        return results;
    }

    columns = [
        {
            name: "Profile Photo",
            selector: (row) => <img src={`/uploads/admin/${row.img}`} alt={`../uploads/admin/${row.img}`} style={{ width: "50px" }}></img>

        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Admin ID",
            selector: (row) => row.adminId,
            sortable: true
        },
        {
            name: "Email Address",
            selector: (row) => row.email,
            sortable: true
        },
        {
            name: "View",
            selector: (row) => <Button variant="primary" size="sm" onClick={() => this.handleShowAdmin(row._id)}>View</Button>
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


    filterData(admins, searchKey) {
        const result = admins.filter((admin) =>
            admin.name.toLowerCase().includes(searchKey) || admin.name.toUpperCase().includes(searchKey)
        )
        this.setState({
            admins: result
        })
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
        axios.get("http://localhost:8000/admins").then(res => {
            if (res.data.success) {
                this.filterData(res.data.existingAdmins, searchKey)
            }
        })
    }

    SearchAdmins = <div className="col-lg-3 mt-2 mb-2">
        <input className="form-control" type="search" placeholder="Search" onChange={this.handleSearchArea}></input>
    </div>


    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mt-2 mb-2">
                            <h4>All Admins</h4>
                        </div>
                    </div>
                    <DataTable
                        title="Search admins with thier name or blood type"
                        responsive
                        subHeader
                        columns={this.columns}
                        data={this.state.admins}
                        subHeaderComponent={this.SearchAdmins}
                        striped={true}
                        highlightOnHover={true}
                        pagination
                        paginationComponent={this.BootyPagination}
                        defaultSortFieldID={1}
                    />
                </div>
                <Modal show={this.state.showDetails} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Donor Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card" style={{ margin: "20px", border: "none" }}>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>{this.state.admin.name}</h5>
                                        <br></br>
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src={`../../uploads/admin/${this.state.admin.img}`} alt="photo" style={{ width: "25%", height: "25%", marginLeft: "auto", marginRight: "auto" }}></img>
                                        </div>
                                    </div>
                                    <dl className="d-flex align-items-center">
                                        <dl className="row">
                                            <dt className="col-lg-5">admin ID</dt>
                                            <dd className="col-lg-7">{this.state.admin.adminId}</dd>
                                            <hr></hr>
                                            <dt className="col-lg-5">Email</dt>
                                            <dd className="col-lg-7">{this.state.admin.email}</dd>
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
