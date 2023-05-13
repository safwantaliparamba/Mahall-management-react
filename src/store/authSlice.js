import { createSlice } from "@reduxjs/toolkit";

import { getLocalStorageItem } from '../functions'


const initialState = {
    username: getLocalStorageItem("username"),
    accessToken: getLocalStorageItem("accessToken"),
    refreshToken: getLocalStorageItem("refreshToken"),
    isAuthenticated: getLocalStorageItem("isAuthenticated"),
    networkError: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { username, accessToken, refreshToken, isAuthenticated } = action.payload

            state.accessToken = accessToken
            state.refreshToken = refreshToken
            state.username = username
            state.isAuthenticated = isAuthenticated

            localStorage.setItem('username', username)
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshTokem', refreshToken)
            localStorage.setItem('isAuthenticated', ""+isAuthenticated)
        },
        logout: (state) => {
            localStorage.clear()
            state.isAuthenticated = false
        },
        setNetworkError: (state, action) => {
            state.networkError = action.payload.isAuthenticated
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer;