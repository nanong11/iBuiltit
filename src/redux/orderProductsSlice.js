import { createSlice } from "@reduxjs/toolkit";

export const orderProductsSlice = createSlice({
    name: "orderProducts",
    initialState: { value: []},
    reducers: {
        setOrderProductData: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setOrderProductData } = orderProductsSlice.actions

export default orderProductsSlice.reducer