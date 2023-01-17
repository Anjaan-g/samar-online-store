import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialstate:{token:null},
    reducers: {
        setToken: (state, action) => {
            const token = action.payload;
        }
    }
})