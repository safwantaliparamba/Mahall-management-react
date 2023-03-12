import axios from "axios";


const URL = "http://127.0.0.1:8000/api/v1"

export const authenticatedAPI = axios.create({
    baseURL: URL
})

export const api = axios.create({
    baseURL: URL
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
        console.log(`error occured in ${URL}${error.config.url}`);
        // console.log(error);
        return error;
    })



    api.interceptors.response.use(
        // response
        (response) => {
            return response
        }
        ,
        // error
        (error) => {
            console.log(`error occured in ${URL}${error.config.url}`);
            return error;
        })