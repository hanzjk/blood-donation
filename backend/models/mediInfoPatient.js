const mongoose = require('mongoose');
const mediInfoPatientSchema = mongoose.Schema({
    patientId:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    bloodType:{
        type:String,
        required:true
    },
    content:{
        type:Number,
        required:true
    },
    temperature:{
        type:Number,
        required:true
    },
    pulse:{
        type:Number,
        required:true
    },
    bloodPressure:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('mediInfoPatient',mediInfoPatientSchema);