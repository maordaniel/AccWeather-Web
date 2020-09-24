import axios from 'axios';


export const apiKey = "OvRHhEwVWPRJbkeY2wkCVx4vZZxCXvfN";

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
