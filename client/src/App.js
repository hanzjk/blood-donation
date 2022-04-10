import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import GetDonors from "./components/donor/Get"
import SignUpDonor from "./components/donor/SignUp"
import LoginDonor from "./components/donor/Login"
import EditDonor from "./components/donor/Edit"
import GetHospitals from "./components/hospital/Get"
import SignUpHospital from "./components/hospital/SignUp"
import LoginHospital from "./components/hospital/Login"
import EditHospital from "./components/hospital/Edit"
import SignUpPatient from "./components/patient/SignUp"
import GetPatients from "./components/patient/Get"
import EditPatient from "./components/patient/Edit"
import LoginPatient from "./components/patient/Login"
import UpdatePwdDonor from "./components/donor/UpdatePassword"
import SignUpAdmin from './components/admin/SignUp'
import AdminHome from './components/admin/Home'
import LoginAdmin from './components/admin/Login'
import AdminGetDonors from './components/admin/GetDonors'
import AdminGetNurses from './components/admin/GetNurses'
import AdminGetPatients from './components/admin/GetPatients'
import EditAdmin from './components/admin/Edit'
import GetAdmins from './components/admin/Get'
import AdminNavbar from './components/admin/Navbar'
import Messenger from './components/messenger/Messenger'
import SignUpNurse from './components/nurse/SignUp'

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <Route exact path="/donors" component={GetDonors} />
          <Route exact path="/donors/add" component={SignUpDonor} />
          <Route exact path="/donor/edit/:id" component={EditDonor} />
          <Route exact path="/donor/login" component={LoginDonor}/>
          <Route exact path="/donor/password/update/:id" component={UpdatePwdDonor} />
          <Route exact path="/hospitals" component={GetHospitals} />
          <Route exact path="/hospitals/add" component={SignUpHospital} />
          <Route exact path="/hospital/edit/:id" component={EditHospital} />
          <Route exact path="/hospital/login" component={LoginHospital} />
          <Route exact path="/patients" component={GetPatients} />
          <Route exact path="/patients/add" component={SignUpPatient} />
          <Route exact path="/patient/edit/:id" component={EditPatient} />
          <Route exact path="/patient/login" component={LoginPatient} />
          <Route exact path="/admins/save" component={SignUpAdmin}/>
          {/* <Route exact path="/admin/dashboard/:id" component={AdminNavbar}/> */}
          <Route exact path="/admin/home/:id" component={AdminHome}/>
          <Route exact path="/admin/login" component={LoginAdmin}/>
          <Route exact path="/admin/donors" component={AdminGetDonors}/>
          <Route exact path="/admin/edit/:id" component={EditAdmin}/>
          <Route exact path="/admins" component={GetAdmins} />
        <Route exact path="/donors" component={GetDonors} />
        <Route exact path="/donors/add" component={SignUpDonor} />
        <Route exact path="/donor/edit/:id" component={EditDonor} />
        <Route exact path="/donor/login" component={LoginDonor} />
        <Route
          exact
          path="/donor/password/update/:id"
          component={UpdatePwdDonor}
        />
        <Route exact path="/hospitals" component={GetHospitals} />
        <Route exact path="/hospitals/add" component={SignUpHospital} />
        <Route exact path="/hospital/edit/:id" component={EditHospital} />
        <Route exact path="/hospital/login" component={LoginHospital} />
        <Route exact path="/patients" component={GetPatients} />
        <Route exact path="/patients/add" component={SignUpPatient} />
        <Route exact path="/patient/edit/:id" component={EditPatient} />
        <Route exact path="/patient/login" component={LoginPatient} />
        <Route exact path="/admins/save" component={SignUpAdmin} />
        <Route exact path="/admin/home/:id" component={AdminHome} />
        <Route exact path="/admin/login" component={LoginAdmin} />
        <Route exact path="/admin/donors" component={AdminGetDonors} />
        <Route exact path="/admin/nurses" component={AdminGetNurses} />
        <Route exact path="/admin/patients" component={AdminGetPatients} />
        <Route exact path="/nurses/save" component={SignUpNurse} />
        <Route exact path="/admin/edit/:id" component={EditAdmin} />
        <Route exact path="/admins" component={GetAdmins} />
        <Route exact path="/admin/messenger" component={Messenger} />
      </BrowserRouter>
    );
  }
}
