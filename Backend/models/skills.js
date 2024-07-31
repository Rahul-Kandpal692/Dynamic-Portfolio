import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Title is Required"]
    },
    proficiency:{
        type:Number,
        required:[true,"Proficiency is required"]
    },
    svg:{
        public_id:{
            type:String,
            required: true,
        },
        url:{
            type: String,
            required: true,
        }
    }
    
});

export const Skill = mongoose.model(
    "Skill",
    skillSchema
  );