import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import productsReducer from './productSlice'
import orderSlice from './orderSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        order: orderSlice
    }
})

export default store
