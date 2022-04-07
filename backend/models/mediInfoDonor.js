const mongoose = require('mongoose');
const mediInfoDonorSchema = mongoose.Schema({

    donorId:{
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

module.exports = mongoose.model('mediInfoDonor',mediInfoDonorSchema);