import { createSlice } from "@reduxjs/toolkit";

const typeSlice = createSlice({
    name:'type',
    initialState:{value:null},
    reducers:{
        setType:(state,action)=>{
            state.value = action.payload
        },
        clearType:(state)=>{
            state.value = null
        }
    }
})

export const {setType,clearType} = typeSlice.actions
export default typeSlice.reducer