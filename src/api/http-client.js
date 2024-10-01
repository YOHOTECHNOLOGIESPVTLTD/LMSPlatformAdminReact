import axios from "axios";

const Axios = axios.create({
    baseURL : process.env.REACT_APP_PUBLIC_API_URL,
    timeout : 50000,
    headers : {
        "Content-Type" : "application/json"
    }
})

Axios.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    if(token){
      config.headers["Authorization"] = `Token ${token ? token : " "}`
    }
    return config
})

Axios.interceptors.response.use((response)=>response,
(error)=> { 
    if(error?.response && error?.response?.status === 401 && error?.response?.statusText === "Unauthorized"){
       localStorage.removeItem("isAuthenticated")
       localStorage.removeItem("permissions")
       localStorage.removeItem("token")
       localStorage.removeItem("userData")
    }
    return Promise.reject(error)
}
)

class HttpClient {
    async get(url,params){
        const reponse = Axios.get(url,{params})
        return reponse
    }
    async post(url,data,params){
        const response = Axios.post(url,data,{params})
        return response
    }
    async patch(url,data){
        const response = Axios.patch(url,data)
        return response
    }
    async delete(url){
        const response = Axios.delete(url)
        return response
    }
    async uploadFile(url,data){
        const response = Axios.post(url,data,{headers:{"Content-Type":"multipart/form-data"}})
        return response
    }
}

export default new HttpClient()