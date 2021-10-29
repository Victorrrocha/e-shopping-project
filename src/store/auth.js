import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    token: '',
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action){
            localStorage.setItem("token", action.payload.token)
            state.token = action.payload.token
            state.isLoggedIn = true
        },
        logout(state){
            localStorage.removeItem("token")
            state.token = ""
            state.isLoggedIn = false
        }
    }
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions