import React, { Component } from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import Navbar from './Navbar';

export default class Get extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admins: []
        }
    }

    componentDidMount() {
        this.getAdmins();
    }

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
                <Navbar />
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
            </div>
        )
    }
}
