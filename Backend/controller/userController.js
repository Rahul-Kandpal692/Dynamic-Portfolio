import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import {v2 as cloudinary} from "cloudinary"
import { generateToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
// import {getResetPasswordToken} from "../models/userSchema.js"
import crypto from "crypto";



// Please run register in thunder because there is a problem in postman while uploading images
export const register = catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Avatar and Resume Are Required",400))
    }
    const avatar=req.files.avatar
    const resume=req.files.resume;

    console.log(avatar,resume)

    const cloudinaryResponseForAvatar= await cloudinary.uploader.upload(avatar.tempFilePath,
        {folder: "AVATAR"}
    );
    if(!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error){
        console.error(
            "Cloudinary Error",
            cloudinaryResponseForAvatar.error || "Unknown Cloudinary Error"
        )
        return next(new ErrorHandler("Failed to upload avatar", 500));
    }


    const cloudinaryResponseForResume= await cloudinary.uploader.upload(resume.tempFilePath,
        {folder: "RESUME"}
    );
    if(!cloudinaryResponseForResume || cloudinaryResponseForResume.error){
        console.error(
            "Cloudinary Error",
            cloudinaryResponseForResume.error || "Unknown Cloudinary Error"
        )
        return next(new ErrorHandler("Failed to upload avatar", 500));
    }

    const {
        fullName,
        email,
        phone,
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        linkedInURL,
        DSAURL,
      } = req.body;


      const user = await User.create({
        fullName,
        email,
        phone,
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        linkedInURL,
        DSAURL,
        avatar: {
          public_id: cloudinaryResponseForAvatar.public_id, // Set your cloudinary public_id here
          url: cloudinaryResponseForAvatar.secure_url, // Set your cloudinary secure_url here
        },
        resume: {
          public_id: cloudinaryResponseForResume.public_id, // Set your cloudinary public_id here
          url: cloudinaryResponseForResume.secure_url, // Set your cloudinary secure_url here
        },
      });
      generateToken(user, "Registered!", 201, res);
      
});

export const login = catchAsyncErrors(async(req,res,next)=>{
  const {email,password}=req.body;
  if(!email||!password){
    return next(new ErrorHandler("Please fill all fields",400))
  }

  const user=await User.findOne({email}).select("password");
  if(!user){
    return next(new ErrorHandler("Invalid Email or Password",400));
  }
  const isPassMatch = await user.comparePassword(password);
  if(!isPassMatch){
    return next(new ErrorHandler("Invalid Email or Password",400));
  }

  generateToken(user,"Logged In!",200,res);
});


export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out!",
    });
});

export const getUser = catchAsyncErrors(async(req,res,next)=>{
  const user = await User.findById(req.user.id);
  console.log(req.user);
  res.status(200).json({
    success:true,
    user,
  })
})

export const  updateProfile= catchAsyncErrors(async(req,res,next)=>{
  const newUserData={
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    githubURL: req.body.githubURL,
    portfolioURL: req.body.portfolioURL,
    DSAURL: req.body.DSAURL,
    linkedInURL: req.body.linkedInURL,
  }

  if(req.files && req.files.avatar){
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id);
    const profileImageId= user.avatar.public_id;
    if(profileImageId){
      await cloudinary.uploader.destroy(profileImageId);
    }
    const cloudinaryResponse= await cloudinary.uploader.upload(avatar.tempFilePath,
        {folder: "AVATAR"}
    );
    newUserData.avatar = {
      public_id:cloudinaryResponse.public_id,
      url:cloudinaryResponse.secure_url
    }
  }


  if(req.files && req.files.resume){
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);
    const resumeFileId= user.resume.public_id;
    if(resumeFileId){
      await cloudinary.uploader.destroy(resumeFileId);
    }
    const cloudinaryResponse= await cloudinary.uploader.upload(resume.tempFilePath,
        {folder: "RESUME"}
    );
    newUserData.resume = {
      public_id:cloudinaryResponse.public_id,
      url:cloudinaryResponse.secure_url
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Profile Updated!",
    user,
  });
})

export const  updatePassword= catchAsyncErrors(async(req,res,next)=>{
  const {currentPassword, newPassword, confirmNewPassword} = req.body;
  
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please Fill All Fields.", 400));
  }

  const user= await User.findById(req.user.id).select("+password")
  const isPassMatched = await user.comparePassword(currentPassword);
  if(!isPassMatched){
    return next(new ErrorHandler("Current password does not match!"));
  }

  if(newPassword!==confirmNewPassword){
    return next(new ErrorHandler("New Password and Confirm Password does not match!"));
  }

  user.password=newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Updated!",
  });

})

export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  // console.log(user);
  
  const id= "66a6233814768883965f3eb2";
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });

})


// FORGOT PASSWORD
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({email:req.body.email});
  if(!user){
    return next(new ErrorHandler("user not found",400));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({validateBeforeSave:false});
  const resetPasswordUrl  = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;
  const message = `Your reset Password Token is:-> \n\n ${resetPasswordUrl} \n\n If you've not requested for this, please ignore it.`
  try{
    await sendEmail({
      email:user.email,
      subject:"Personal Pertfolio Dashboard Recovery Password",
      message,
    });
    res.status(200).json({
      success:true,
      message:`Email sent to ${user.email} successfully`
    })

  }catch(error){
    user.resetPasswordExpire = undefined,
    user.resetPasswordToken = undefined,
    await user.save();
    return next(new ErrorHandler(error.message, 500))
  }
})

export const resetPassword = catchAsyncErrors(async (req, res, next) => {

  const {token} = req.params;

  console.log(req.params);

  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(token)
  .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired.",
        400
      )
    );
  }

  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("Password & Confirm Password do not match"));
  }

  user.password = await req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  generateToken(user, "Reset Password Successfully!", 200, res);

})









