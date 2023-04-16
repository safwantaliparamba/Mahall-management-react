import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

import { getLocalStorageItem } from '../functions'


interface InitialState {
    username: string
    accessToken: string
    refreshToken: string
    isAuthenticated: boolean
    networkError?: boolean
}

const initialState: InitialState = {
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
        login: (state, action: PayloadAction<InitialState>) => {
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
        setNetworkError: (state, action:PayloadAction<{isAuthenticated: boolean}>) => {
            state.networkError = action.payload.isAuthenticated
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer;