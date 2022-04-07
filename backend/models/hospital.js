const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const hospitalSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    address:{
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

hospitalSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

hospitalSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('hospital',hospitalSchema);