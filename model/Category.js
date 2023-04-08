const mongoose = require('mongoose');
const Service = require('./Service');
const {Schema}=mongoose

const categorySchema = new Schema({
    title:String,
    image:String,
    services:[
        {
            type:Schema.Types.ObjectId,
            ref:"Service"
        }
    ],
    createdOn:{
        type:Date,
        default:Date.now
    }
})

categorySchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Service.deleteMany({
            _id: {
                $in: doc.services
            }
        })
    }
})


module.exports = mongoose.model("Category",categorySchema);

