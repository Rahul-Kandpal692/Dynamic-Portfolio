import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { SoftwareApplication } from "../models/softwareApplicationSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewApplication = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(
          new ErrorHandler("Software Application Icon/Image Required!", 404)
        );
      }
    const {svg} = req.files;
    const {name} = req.body;

    if (!name) {
        return next(new ErrorHandler("Please Provide Software's Name!", 400));
      }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        svg.tempFilePath,
        {folder:"PORTFOLIO SOFTWARE APPLICATION IMAGES"}
    )
    if(!cloudinaryResponse||cloudinaryResponse.error){
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
            return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
    }
    const softwareApplications = await SoftwareApplication.create({
        name,
        svg: {
          public_id: cloudinaryResponse.public_id, // Set your cloudinary public_id here
          url: cloudinaryResponse.secure_url, // Set your cloudinary secure_url here
        },
      });
    res.status(201).json({
        success: true,
        message: "New Software Application Added!",
        softwareApplications,
      });
})



export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const application = await SoftwareApplication.findById(id);
    if(!application){
        return next(new ErrorHandler("Already Deleted!", 404));
    }
    const softwareApplicationSvgId = application.svg.public_id;
    await cloudinary.uploader.destroy(softwareApplicationSvgId);
    await application.deleteOne();
     res.status(200).json({
    success: true,
    message: "Software Application Deleted!",
  });

});

export const getAllApplication = catchAsyncErrors(async (req, res, next) => {
    const applications = await SoftwareApplication.find();
    if(!applications){
        return next(new ErrorHandler("No Software Aplication is Added !", 404));
    }
    res.status(200).json({
        success: true,
        applications,
      });
})

