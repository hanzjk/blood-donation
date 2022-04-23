import React, { Component } from 'react'
import axios from 'axios'
import Header from "./Header";


export default class ChangePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "",
      admin: {},
      error: "",
      success: false
    }
  }

  setFileName = e => {
    this.setState({
      img: e.target.files[0]
    })
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:8000/admin/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          admin: res.data.admin
        });
      }
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id;

    const formData = new FormData();
    formData.append("img", this.state.img);

    axios.put(`http://localhost:8000/admin/photo/update/${id}`, formData).then((res) => {
      if (res.data.success) {
        this.setState({
          img: "",
          error: "",
          success: true
        });
        window.location.replace("http://localhost:3000/admin/home");
      }
      else {
        this.setState({
          error: "Something went wrong. Please try again later."
        });
      }
    })
  }


  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="col-md-8 mx-auto">
            <div className="card " style={{ border: "none", paddingTop: "5%" }}>
              <h1 className="h3 mb-3 font-weight-normal">
                Change Profile Photo
                </h1>
              <h6 style={{ marginBottom: "5px" }}>Current Photo</h6>
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src={`/../uploads/admin/${this.state.admin.img}`}
                  alt="photo"
                  style={{
                    width: "15%",
                    height: "15%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                ></img>
              </div>
              <form className="needs-validation" noValidate>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Change Profile Photo (Rename with admin id)
                    </label>
                  <input
                    required="true"
                    type="file"
                    className="form-control"
                    name="img"
                    onChange={this.setFileName}
                  ></input>
                </div>
                {this.state.error ? (
                  <div className="alert alert-danger">{this.state.error}</div>
                ) : null}
                {/* {this.state.success ? (<div className="alert alert-success">{this.state.success}</div>) : null} */}
                <div className="d-grid">
                  <button
                    className="btn btn-success"
                    type="submit"
                    style={{ marginTop: "15px" }}
                    onClick={this.onSubmit}
                  >
                    <i className="fa fa-check-square"></i>
                      &nbsp; Update Photo
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
