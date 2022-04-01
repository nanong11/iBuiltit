import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "order",
    initialState: { value: {}},
    reducers: {
        setOrderData: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setOrderData } = orderSlice.actions

export default orderSlice.reducer