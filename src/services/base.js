import axios from 'axios';

const baseUrl = "https://hishobh.herokuapp.com";

export const getTrackers = (userID) =>{
    return axios.get(`${baseUrl}/api/tracker/${userID}`);
}