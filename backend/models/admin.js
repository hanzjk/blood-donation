const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const adminSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    adminId:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    password:{
        type:String,
        required:true
    }
});

adminSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

adminSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('admin',adminSchema);