import React, { Component } from 'react'
import DataTable from "react-data-table-component"
import axios from 'axios'
import Header from './NavBar';
import { Button, Modal } from 'react-bootstrap';

export default class GetHospitals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitals: [],
            id: "",
            show: false,
            showDetails:false,
            hospitalId:"",
            hospital:{}
        }
    }

    componentDidMount() {
        this.getHospitals();
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

    handleShowHospital = (id) => axios.get(`http://localhost:8000/hospital/${id}`).then((res) => {
        if (res.data.success) {
            this.setState({
                showDetails:true,
                hospital:res.data.hospital
            });

            console.log(this.state.hospital);
        }
    })

    onDelete = (id) => {
        axios.delete(`http://localhost:8000/hospitals/delete/${id}`).then(res => {
            this.getHospitals();
            this.handleClose();
        })
    }

    getHospitals() {
        axios.get("http://localhost:8000/hospitals").then(res => {
            if (res.data.success) {
                this.setState({
                    hospitals: res.data.existingHospitals
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
            selector: (row) =><Button variant="primary" size="sm" onClick={()=>this.handleShowHospital(row._id)}>View</Button>
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


    filterData(hospitals, searchKey) {
        const result = hospitals.filter((hospital) =>
            hospital.name.toLowerCase().includes(searchKey) || hospital.name.toUpperCase().includes(searchKey)
        )
        this.setState({
            hospitals: result
        })
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
        axios.get("http://localhost:8000/hospital").then(res => {
            if (res.data.success) {
                this.filterData(res.data.existingHospitals, searchKey)
            }
        })
    }

    SearchHospital = <div className="col-lg-3 mt-2 mb-2">
        <input className="form-control" type="search" placeholder="Search" onChange={this.handleSearchArea}></input>
    </div>


    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mt-2 mb-2">
                            <h4>All Hospitals</h4>
                        </div>
                    </div>
                    <DataTable
                        responsive
                        subHeader
                        columns={this.columns}
                        data={this.state.hospitals}
                        subHeaderComponent={this.SearchHospital}
                        striped={true}
                        highlightOnHover={true}
                        pagination
                        paginationComponent={this.BootyPagination}
                        defaultSortFieldID={1}
                    />
                </div>
                
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton  style={{backgroundColor:"#C41E3A",color:"white"}}>
                        <Modal.Title> Delete Hospital Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign:"center"}}>Delete this account?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.onDelete(this.state.hospitalId)}>
                            Yes
                        </Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showDetails} onHide={this.handleClose}>
                    <Modal.Header closeButton style={{backgroundColor:"#5D8AA8",color:"white"}}>
                        <Modal.Title>Hospital Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card" style={{ margin: "20px" , border:"none"}}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{ textAlign: "center", textTransform: "uppercase" }}>{this.state.hospital.name}</h5>
                                    <br></br>
                                </div>
                                <dl className="d-flex align-items-center">
                                    <dl className="row">
                                        <dt className="col-lg-5">Address</dt>
                                        <dd className="col-lg-7">{this.state.hospital.address}</dd>
                                        <hr></hr>
                                        <dt className="col-lg-5">Contact Number</dt>
                                        <dd className="col-lg-7">{this.state.hospital.contact}</dd>
                                        <hr></hr>
                                        <dt className="col-lg-5">Email</dt>
                                        <dd className="col-lg-7">{this.state.hospital.email}</dd>
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
