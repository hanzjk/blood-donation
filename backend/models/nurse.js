const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const nurseSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    nurseId:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    gender:{
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
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

nurseSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

nurseSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('nurse',nurseSchema);