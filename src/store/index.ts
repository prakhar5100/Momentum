import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import taskReducer from "./taskSlice"
import apiReducer from "./apiSlice"

const store = configureStore({
    reducer : {
        auth : authReducer,
        task : taskReducer,
        api : apiReducer
    }
})

export default store 