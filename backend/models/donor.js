const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const donorSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    contact:{
        type:String,
        required:true
    },
    bloodType:{
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

donorSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

donorSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};


module.exports = mongoose.model('donor',donorSchema);