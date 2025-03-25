import {createSlice} from '@reduxjs/toolkit'



const storedUser = localStorage.getItem("user") 
? JSON.parse(localStorage.getItem("user") as string) 
: null;

const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : storedUser,
        isAuthenticated : !!storedUser
    },
    reducers : {
        loginSuccess : (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        logout : (state) => {
            state.user = null;
            state.isAuthenticated = false
            localStorage.removeItem("user")
            localStorage.removeItem("task")
        }
    }
})

export const {loginSuccess, logout} = authSlice.actions 
export default authSlice.reducer