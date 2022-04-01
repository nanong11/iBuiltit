import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "products",
    initialState: { value: {}},
    reducers: {
        setProductsData: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setProductsData } = productSlice.actions

export default productSlice.reducer