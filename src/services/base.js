import axios from 'axios';

const baseUrl = "http://localhost:5000";

export const getTrackers = (userID) =>{
    return axios.get(`${baseUrl}/api/tracker/${userID}`);
}

export const getTransactions = (TrackerId) =>{
    return axios.get(`${baseUrl}/api/transactions/${TrackerId}`);
}

export const getTransactionSummary = (TrackerId) =>{
    return axios.get(`${baseUrl}/api/transactions/summary/${TrackerId}`);
}