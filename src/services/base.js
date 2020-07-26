import axios from 'axios';

const baseUrl = "http://localhost:5000";

export const getTrackers = (userID) =>{
    return axios.get(`${baseUrl}/api/tracker/${userID}`);
}