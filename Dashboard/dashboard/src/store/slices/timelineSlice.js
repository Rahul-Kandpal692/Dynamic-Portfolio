import React from "react";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";


const timelineSlice = createSlice({
    name:"timeline",
    initialState:{
        loading:false,
        message:null,
        error:null,
        timeline:[]
    },
    reducers: {
        getAllTimelineRequest(state,action){
            state.loading=true;
           
            state.error=null;
            state.timeline=[];
        },
        getAllTimelineSucess(state,action){
            state.loading=false;          
            state.error=null;
            state.timeline=action.payload;
        },
        getAllTimelineFailed(state,action){
            state.loading=false;
            state.error=action.payload;
            state.timeline=state.timeline;
        },
        addTimelineRequest(state,action){
            state.loading=true;           
            state.error=null;
            state.message=null;
        },
        addTimelineSucess(state,action){
            state.loading=false;          
            state.error=null;
            state.message=action.payload;
        },
        addTimelineFailed(state,action){
            state.loading=false;
            state.error=action.payload;
            state.message=null;
        },
        deleteTimelineRequest(state,action){
            state.loading=true;           
            state.error=null;
            state.message=null;
        },
        deleteTimelineSucess(state,action){
            state.loading=false;          
            state.error=null;
            state.message=action.payload;
        },
        deleteTimelineFailed(state,action){
            state.loading=false;
            state.error=action.payload;
            state.message=null;
        },
        updateTimelineRequest(state,action){
            state.loading=true;
            state.error=null;
            state.message=null;
        },
        updateTimelineSuccess(state,action){
            state.loading=false;
            state.error=null;
            state.message=action.payload;
        },
        updateTimelineFailed(state,action){
            state.loading=false;
            state.error=action.payload;
            state.message=null;
        },
        resetTimelineSlice(state,action){
            state.loading=false;
            state.error=null;
            state.timeline=state.timeline;
            state.message=null;
        },

        clearAllErrors(state,action){
            state.error=null;
            state=state.timeline;
        }

    }

})

export const getAllTimeline=()=>async(dispatch)=>{
    dispatch(timelineSlice.actions.getAllTimelineRequest());
    try {
        const {data}=await axios.get(
            "https://dynamic-portfolio-backend-essm.onrender.com/api/v1/timeline/getall",
            {withCredentials:true}
        );
        dispatch(timelineSlice.actions.getAllTimelineSucess(data.timelines));
    } catch (error) {
        dispatch(timelineSlice.actions.getAllTimelineFailed(error.response.data.message));
    }
}


export const addTimeline=(newData)=>async(dispatch)=>{
    dispatch(timelineSlice.actions.addTimelineRequest());
    try {
        const {data}=await axios.post(
            "https://dynamic-portfolio-backend-essm.onrender.com/api/v1/timeline/add",
            newData,
            {
                withCredentials:true, 
                headers: { "Content-Type": "application/json" },
            }
        );
        dispatch(timelineSlice.actions.addTimelineSucess(data.message));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(timelineSlice.actions.addTimelineFailed(error.response.data.message));
    }
}


export const deleteTimeline=(id)=>async(dispatch)=>{
    dispatch(timelineSlice.actions.deleteTimelineRequest());
    try {
        const {data}=await axios.delete(
            `https://dynamic-portfolio-backend-essm.onrender.com/api/v1/timeline/delete/${id}`,
            {
                withCredentials:true,
            }
        );
        dispatch(timelineSlice.actions.deleteTimelineSucess(data.message));
    } catch (error) {
        dispatch(timelineSlice.actions.deleteTimelineFailed(error.response.data.message));
    }
}




export const resetTimelineSlice = () => (dispatch)=>{
    dispatch(timelineSlice.actions.resetTimelineSlice());
}

export const clearAllTimelineErrors = () => (dispatch)=>{
    dispatch(timelineSlice.actions.clearAllErrors());
}




export default timelineSlice.reducer;