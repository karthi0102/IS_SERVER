const mongoose = require('mongoose');

const {Schema}=mongoose

const userSchema = new Schema({
    name:String,
    email:String,
    phone:String,
    password:String,
    deviceId:{
        type:"String",
        default:'-'
    },
    requests:[
        {
            type:Schema.Types.ObjectId,
            ref:"Request"
        }
    ],
    createdOn:{
        type:Date,
        default:Date.now
    },
})
module.exports=mongoose.model("User",userSchema);


