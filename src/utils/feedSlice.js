import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeCard:(state,action)=>{
            if (!state) return state;
            if (!state.user || !Array.isArray(state.user)) return state;
            console.log("STATE::",state);
            console.log("Filtering user with userId:", action.payload);
            return {
                ...state,
                user: state.user.filter(request=> request._id!==action.payload)
            };
        },
        // eslint-disable-next-line no-unused-vars
        removeFeed:(state,action)=>null,
    }
})

export const {addFeed,removeFeed,removeCard}=feedSlice.actions;
export default feedSlice.reducer;