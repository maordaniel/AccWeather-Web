import axios from 'axios';


export const apiKey = "UZz9q6hIb9ElwJZ6YbPkNKReCT5ua3l7";

const ax = axios.create({
    baseURL:'http://dataservice.accuweather.com',
    withCredentials: false,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
});

export async function GetData(url, params) {
    try{
        const response = await ax.get(url, { params });
        return response;
    }catch (error) {
        const { response } = error;
        throw response
    }
}
