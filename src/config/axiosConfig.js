import axios from "axios";

const api = axios.create({
    baseURL:'http://127.0.0.1:8000/api/v1'
})

export default api


export const authenticatedAPI = axios.create({
    baseURL:"http://127.0.0.1:8000/api/v1"
})

authenticatedAPI.interceptors.request.use(async (config)=>{
    const access = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null
    config.headers = {
        'Authorization': 'Bearer ' + access
    }

    return config
})