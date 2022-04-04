import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import productsReducer from './productSlice'
import orderReducer from './orderSlice'
import orderProductReducer from './orderProductsSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        order: orderReducer,
        orderProducts: orderProductReducer
    }
})

export default store
