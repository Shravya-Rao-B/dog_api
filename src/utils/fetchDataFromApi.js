import axios from "axios";
export const BASE_URL = `https://api.thedogapi.com/v1`  //Api from https://portal.thatapicompany.com/ 
const options = {
    url: BASE_URL,
    headers: {
      'api_key': process.env.REACT_APP_DOG_API_KEY,  //env variable in .env file
    }
  };

export const fecthDataFromApi =  (url) => {
return axios.get(`${BASE_URL}/${url}`, options).then(res => res)
}