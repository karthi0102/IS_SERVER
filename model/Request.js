const mongoose = require('mongoose');


const {Schema}=mongoose

const requestSchema = new Schema({
        requestOn:{
            type:Date,
            default:Date.now
        },
        category:String,
        work:String,
        status:{
            type:String
        },
        user:{
           type:Schema.Types.ObjectId,
           ref:"User"
        }
})

module.exports= mongoose.model("Request",requestSchema)

