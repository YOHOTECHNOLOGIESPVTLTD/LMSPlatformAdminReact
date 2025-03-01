import axios from 'axios'

const API_BASE_URL='https://api.countrystatecity.in/v1'
const API_KEY='U2J4Mno0UGgzYWw2WHp0QjJuekY5V25aTGsxMlgyY3VGS0lwakY4aA=='

const apiClient=axios.create({
    baseURL:API_BASE_URL,
    headers:{
        'X-CSCAPI-KEY':API_KEY
    }
})

export const fetchCountries=async()=>{
    console.log("response")
    const response=await apiClient.get('/countries')
    console.log(response,'response')
    return response.data
}

export const fetchStates=async(countryCode)=>{
    const response=await apiClient.get(`/countries/${countryCode}/states`)
    console.log('statess',response)
    return response.data;
}

export const fetchCities=async(countryCode,stateCode)=>{
    const response=await apiClient.get(`/countries/${countryCode}/states/${stateCode}/cities`)
    return response.data;
}