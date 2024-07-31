import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
import axios from 'axios';

const projectSlice = createSlice({
    name:"project",
    initialState:{
        message:null,
        error:null,
        projects:[],
        loading:false,
        singleProject:{},
    },
    reducers:{
        getAllProjectRequest(state,action){        
            state.error=null;
            state.projects=[];
            state.loading=false;
        },
        getAllProjectSuccess(state,action){          
            state.error=null;
            state.projects=action.payload
            state.loading=false;
        },
        getAllProjectFailed(state,action){          
            state.error=action.payload;
            state.projects=state.projects;
            state.loading=false;
        },

        getSingleProjectRequest(state,action){        
            state.error=null;
            state.singleProject={};
            state.loading=false;
        },
        getSingleProjectSuccess(state,action){          
            state.error=null;
            state.singleProject=action.payload
            state.loading=false;
        },
        getSingleProjectFailed(state,action){          
            state.error=action.payload;
            state.singleProject=state.singleProject;
            state.loading=false;
        },



        addProjectRequest(state,action){
            state.loading=true;           
            state.error=null;
            state.message=null;
        },
        addProjectSucess(state,action){
            state.loading=false;          
            state.error=null;
            state.message=action.payload;
        },
        addProjectFailed(state,action){
            state.loading=false;
            state.error=action.payload;
            state.message=null;
        },
        deleteProjectRequest(state,action){
            state.loading=true;           
            state.error=null;
            state.message=null;
        },
        deleteProjectSucess(state,action){
            state.loading=false;          
            state.error=null;
            state.message=action.payload;
        },
        deleteProjectFailed(state,action){
            state.loading=false;
            state.error=action.payload;
            state.message=null;
        },
        updateProjectRequest(state,action){
            state.loading=true;           
            state.error=null;
            state.message=null;
        },
        updateProjectSucess(state,action){
            state.loading=false;          
            state.error=null;
            state.message=action.payload;
        },
        updateProjectFailed(state,action){
            state.loading=false;
            state.error=action.payload;
            state.message=null;
        },



        resetProjectSlice(state,action){
            state.loading=false;
            state.error=null;
            state.projects=state.projects;
            state.message=null;
            state.singleProject={};
        },
        

        clearAllErrors(state,action){          
            state.error=null;
            state=state.projects;
        },
    }
})

export const getAllprojects=()=>async(dispatch)=>{
    dispatch(projectSlice.actions.getAllProjectRequest());
    try {
      const {data} = await axios.get("http://localhost:4000/api/v1/project/getall", {
        withCredentials: true,
      });
      dispatch(projectSlice.actions.getAllProjectSuccess(data.projects));
      // dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(projectSlice.actions.getAllProjectFailed(error.response.data.message));
    }
}


export const getSingleproject=(id)=>async(dispatch)=>{
    dispatch(projectSlice.actions.getSingleProjectRequest());
    try {
        const {data} = await axios.get(
            `http://localhost:4000/api/v1/project/get/${id}`,
            {withCredentials: true,});


        dispatch(projectSlice.actions.getSingleProjectSuccess(data.project));
    
        
    } catch (error) {
        dispatch(projectSlice.actions.getSingleProjectFailed(error.response.data.message));        
    }
}


export const addProject=(newData)=>async(dispatch)=>{
    dispatch(projectSlice.actions.addProjectRequest());
    try {
        const {data} = await axios.post(
            "http://localhost:4000/api/v1/project/add",
            newData,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });


        dispatch(projectSlice.actions.addProjectSucess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
        
        
    } catch (error) {
        dispatch(projectSlice.actions.addProjectFailed(error.response.data.message));        
    }
}


export const deleteProject=(id)=>async(dispatch)=>{
    dispatch(projectSlice.actions.deleteProjectRequest());
    try {
        const {data} = await axios.delete(
            `http://localhost:4000/api/v1/project/delete/${id}`,
            {
                withCredentials: true,
                // headers: { "Content-Type": "multipart/form-data" },
            });


        dispatch(projectSlice.actions.deleteProjectSucess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
        
    } catch (error) {
        dispatch(projectSlice.actions.deleteProjectFailed(error.response.data.message));        
    }
}



export const updateProject=(id,newData)=>async(dispatch)=>{
    dispatch(projectSlice.actions.updateProjectRequest());
    try {
        const {data} = await axios.put(
            `http://localhost:4000/api/v1/project/update/${id}`,
            newData,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });


        dispatch(projectSlice.actions.deleteProjectSucess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
        
    } catch (error) {
        dispatch(projectSlice.actions.deleteProjectFailed(error.response.data.message));        
    }
}

export const resetProject=()=>async(dispatch)=>{
    dispatch(projectSlice.actions.resetProjectSlice());
}

export const clearAllProjectErrors=()=>async(dispatch)=>{
    dispatch(projectSlice.actions.clearAllErrors());
}





export default projectSlice.reducer;