import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: { value: { 
        firstName: "",
        lastName: "",
        email: "",
        isAdmin: false,
        error: ""
    }},
    reducers: {
        loginSuccess: (state, action) => {
            state.value = action.payload
        },
        loginFail: (state, action) => {
            state.value.error = action.payload
        }
    }
})

export const { loginSuccess, loginFail } = userSlice.actions

export default userSlice.reducer