const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    senderID:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    receiverID:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","accepted","rejected","cancelled"]
    }
},{timestamps:true});

module.exports =mongoose.model("Request",requestSchema);