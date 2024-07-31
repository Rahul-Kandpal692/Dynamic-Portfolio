import React from "react";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const skillSlice = createSlice({
    name :"skill",
    initialState:{
        message:null,
        error:null,
        skills:[],
        loading:false,
    },
    reducers:{
        getSkillRequest(state,action){        
            state.error=null;
            state.skills=[];
            state.loading=false;
        },
        getSkillSuccess(state,action){          
            state.error=null;
            state.skills=action.payload
            state.loading=false;
        },
        getSkillFailed(state,action){          
            state.error=action.payload;
            state.skills=state.skills;
            state.loading=false;
        },



        addSkillRequest(state,action){
            state.loading=true;           
            state.error=null;
            state.message=null;
        },
        addSkillSucess(state,action){
            state.loading=false;          
            state.error=null;
            state.message=action.payload;
        },
        addSkillFailed(state,action){
            state.loading=false;
            state.error=action.payload;
            state.message=null;
        },
        deleteSkillRequest(state,action){
            state.loading=true;           
            state.error=null;
            state.message=null;
        },
        deleteSkillSucess(state,action){
            state.loading=false;          
            state.error=null;
            state.message=action.payload;
        },
        deleteSkillFailed(state,action){
            state.loading=false;
            state.error=action.payload;
            state.message=null;
        },
        updateSkillRequest(state,action){
            state.loading=true;           
            state.error=null;
            state.message=null;
        },
        updateSkillSucess(state,action){
            state.loading=false;          
            state.error=null;
            state.message=action.payload;
        },
        updateSkillFailed(state,action){
            state.loading=false;
            state.error=action.payload;
            state.message=null;
        },



        resetSkillSlice(state,action){
            state.loading=false;
            state.error=null;
            state.skills=state.skills;
            state.message=null;
        },
        

        clearAllErrors(state,action){          
            state.error=null;
            state=state.skills;
        },
    }
});

export const getAllSkill=()=>async(dispatch)=>{
    dispatch(skillSlice.actions.getSkillRequest());
  try {
    const { data } = await axios.get("https://dynamic-portfolio-backend-essm.onrender.com/api/v1/skill/getall", {
      withCredentials: true,
    });
    dispatch(skillSlice.actions.getSkillSuccess(data.skills));
    // dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.getSkillFailed(error.response.data.message));
  }
}



export const addSkill=(newData)=>async(dispatch)=>{
    dispatch(skillSlice.actions.addSkillRequest());
    try {
        const {data}=await axios.post(
            "https://dynamic-portfolio-backend-essm.onrender.com/api/v1/skill/add",
            newData,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(skillSlice.actions.addSkillSucess(data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(skillSlice.actions.addSkillFailed(error.response.data.message));
    }
}


export const updateSkill=(id,proficiency)=>async(dispatch)=>{
    dispatch(skillSlice.actions.updateSkillRequest());
    try {
        const {data}=await axios.put(
            `https://dynamic-portfolio-backend-essm.onrender.com/api/v1/skill/update/${id}`,
            {proficiency},
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(skillSlice.actions.updateSkillSucess(data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(skillSlice.actions.updateSkillFailed(error.response.data.message));
    }
}



export const deleteSkill=(id)=>async(dispatch)=>{
    dispatch(skillSlice.actions.deleteSkillRequest());
    try {
        const {data}=await axios.delete(
            `https://dynamic-portfolio-backend-essm.onrender.com/api/v1/skill/delete/${id}`,

            {
                withCredentials: true,
            }
        );
        dispatch(skillSlice.actions.deleteSkillSucess(data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message));
    }
}


export const resetSkill=()=>(dispatch)=>{
    dispatch(skillSlice.actions.resetSkillSlice());
}

export const clearAllSkillErrors=()=>(dispatch)=>{
    dispatch(skillSlice.actions.clearAllErrors());
}

export default skillSlice.reducer;