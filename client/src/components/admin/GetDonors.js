import React, { Component } from 'react'

import DataTable from "react-data-table-component"
import axios from 'axios'
import Navbar from './Navbar';

export default class GetDonors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donors: [],
            id: ""
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

    onDelete = (id) => {
        axios.delete(`http://localhost:8000/donors/delete/${id}`).then(res => {
            alert("Deleted Successfully");
            this.getDonors();
        })
    }

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
            name: "Email Address",
            selector: (row) => row.email,
            sortable: true
        },
        {
            name: "Delete",
            selector: (row) => <a className="btn btn-sm btn-danger" href="#" onClick={() => this.onDelete(row._id)}>Delete <i className="fa fa-trash"></i></a>
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

        console.log(pageItems);

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


    filterData(donors, searchKey) {
        const result = donors.filter((donor) =>
            donor.name.toLowerCase().includes(searchKey) || donor.name.toUpperCase().includes(searchKey) || donor.bloodType.toLowerCase().includes(searchKey) || donor.bloodType.toUpperCase().includes(searchKey)
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
                <Navbar id={this.state.id} />
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
            </div>
        )
    }
}
