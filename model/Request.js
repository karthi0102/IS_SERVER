const mongoose = require('mongoose');


const {Schema}=mongoose

const requestSchema = new Schema({
        requestOn:{
            type:Date,
            default:Date.now
        },
        category:String,
        service:String,
        status:{
            type:String,
            enum:['requested','viewed']
        },
        user:{
           type:Schema.Types.ObjectId,
           ref:"User"
        }
})

module.exports= mongoose.model("Request",requestSchema)

