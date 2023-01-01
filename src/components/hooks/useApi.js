import { MiddlewareArray } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice"


const url = "http://127.0.0.1:8000/api/v1"

const useAuthApi = () => {
    const dispatch = useDispatch()

    const authenticatedAPI = axios.create({
        baseURL: url
    })

    // handle request middleware 
    authenticatedAPI.interceptors.request.use(async (config) => {
        const access = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null
        config.headers = {
            'Authorization': 'Bearer ' + access
        }

        return config
    })
    // handle response middleware
    authenticatedAPI.interceptors.response.use(
        // response 
        (response) => {
            return response
        }
        ,
        // error 
        (error) => {
            console.log(`error occured in ${url}${error.config.url}`);
            // console.log(error);
            if (error.code === "ERR_NETWORK") {
                console.log("Check your internet connection");
                dispatch(authActions.setNetworkError({ networkError: true }))
            }
            return error;
        })

}

export default useAuthApi


export const useApi = () => {
    const dispatch = useDispatch()

    const api = axios.create({
        baseURL: url
    })

    api.interceptors.response.use(
        // response
        (response) => {
            return response
        }
        ,
        // error
        (error) => {
            console.log(`error occured in ${url}${error.config.url}`);
            // console.log(error);
            if (error.code === "ERR_NETWORK") {
                console.log("Check your internet connection");
                dispatch(authActions.setNetworkError({ networkError: true }))
            }
            return error;
        })

    return api
}