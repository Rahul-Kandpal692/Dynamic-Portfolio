import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncErrors(async(req,res,next)=>{
    try{
        const {senderName,senderEmail,subject,message}=req.body;
    if(!senderName||!senderEmail||!subject||!message){
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }

    const data = await Message.create({senderName,senderEmail,subject,message});
    res.status(200).json({
        success:true,
        message:"Message Sent successfully",
        data
    })
    }catch(error){
        console.log(error);
        return next(error);
    }
})

export const getMessages = catchAsyncErrors(async(req,res,next)=>{
    try{
    const messages = await Message.find();
    res.status(200).json({
        success:true,
        messages
    })

    }catch(error){
        console.log(error);
        return next(error);
    }
})

export const deleteMessge = catchAsyncErrors(async(req,res,next)=>{
    try{
    const {id}=req.params;
    const message = await Message.findById(id);
    if(!message){
        return next(new ErrorHandler("Message Already Deleted"),400);
    }

    await message.deleteOne();

    res.status(200).json({
        success:true,
        message:("Message deleted Successfull")
    })
    }catch(error){
        console.log(error);
        return next(error);
    }

})
