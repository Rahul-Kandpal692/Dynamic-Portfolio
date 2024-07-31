import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderName:{
        type:String,
    },
    senderEmail:{
        type:String,
    },
    subject:{
        type:String,
    },
    message:{
        type:String,
    },
    createdAt: {
        type:Date,
        default:Date.now(),
    } 
});

export const Message = mongoose.model("Message",messageSchema);