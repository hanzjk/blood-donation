const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const patientSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    bloodType:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

patientSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

patientSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('patient',patientSchema);