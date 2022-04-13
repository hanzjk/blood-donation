const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const donorRoutes = require('./backend/routes/donor');
const hospitalRoutes = require('./backend/routes/hospital');
const mediInfoDonorRoutes = require('./backend/routes/mediInfoDonor');
const mediInfoPatientRoutes = require('./backend/routes/mediInfoPatient');
const patientRoutes = require('./backend/routes/patient');
const adminRoutes = require('./backend/routes/admin')
const nurseRoutes = require('./backend/routes/nurse')
const stockaRoutes = require('./backend/routes/bloodTypes')
const conversationRoutes = require("./backend/routes/conversations");
const messageRoutes = require("./backend/routes/messages");

const app = express();

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middlewareS
app.use(donorRoutes);
app.use(hospitalRoutes);
app.use(mediInfoDonorRoutes);
app.use(mediInfoPatientRoutes);
app.use(patientRoutes);
app.use(adminRoutes);
app.use(nurseRoutes);
app.use(stockaRoutes);
app.use(conversationRoutes);
app.use(messageRoutes);

const PORT = 8000;
const URL = process.env.DB_URL;

mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('DB Connected');
})
.catch((err)=>{
    console.log(`DB Connection error: ${err}`);
});

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`);
});

