import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    username: localStorage.getItem('username') ? localStorage.getItem('username') : null,
    accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null,
    refreshToken: localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null,
    isAuthenticated: localStorage.getItem('isAuthenticated') ? localStorage.getItem('isAuthenticated') : false,
    networkError: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { username, access, refresh, isAuthenticated } = action.payload
            state.accessToken = access
            state.refreshToken = refresh
            state.username = username
            state.isAuthenticated = isAuthenticated

            localStorage.setItem('username', username)
            localStorage.setItem('accessToken', access)
            localStorage.setItem('refreshTokem', refresh)
            localStorage.setItem('isAuthenticated', isAuthenticated)
        },
        logout: (state, action) => {
            localStorage.clear()
            state.isAuthenticated = false
        },
        setNetworkError: (state, { payload }) => {
            state.networkError = payload.networkError
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer;