const mongoose = require('mongoose');

const {Schema}=mongoose

const serviceSchema = new Schema({
    name:String,
    image:String,
    category:String,
    createdOn:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Service",serviceSchema)
