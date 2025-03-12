import { createSlice } from "@reduxjs/toolkit";

const initialState={
    countries:[],
    states:[],
    cities:[],
    loading:false,
    error:null,
}

const locationSlice=createSlice({
    name:'locations',
    initialState,
    reducers:{
        setCountries(state,action){
            state.countries=action.payload
        },
        setStates(state,action){
            state.states=action.payload
        },
        setCities(state,action){
            state.cities=action.payload
        },
        setLoading(state,action){
            state.loading=action.payload
        },
        setError(state,action){
            state.error=action.payload
        },
    }
})

export const{setCountries,setStates,setCities}=locationSlice.actions;
export default locationSlice.reducer;