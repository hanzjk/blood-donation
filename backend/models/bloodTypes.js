const mongoose = require('mongoose');
const bloodTypesSchema = mongoose.Schema({
    Aplus:{
        type:Number
    },
    Amin:{
        type:Number
    },
    Bplus:{
        type:Number
    },
    Bmin:{
        type:Number
    },
    ABplus:{
        type:Number
    },
    ABmin:{
        type:Number
    },
    Oplus:{
        type:Number
    },
    Omin:{
        type:Number
    }
});

module.exports = mongoose.model('bloodTypes',bloodTypesSchema);