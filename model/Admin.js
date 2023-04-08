const mongoose = require('mongoose')
const {Schema}=mongoose

const adminSchema = new Schema({
        name:String,
        email:String,
        password:String,
        phone:String,
        createdOn:{
            type:Date,
            default:Date.now,
        }
})

module.exports= mongoose.model("Admin",adminSchema)


