import axios from 'axios'

const baseUrl = "https://hishobh.herokuapp.com";

export const getTrackers = (userID) =>{
    return axios.get(`${baseUrl}/api/tracker/${userID}`);
}

export const getTransactions = (TrackerId) =>{
    return axios.get(`${baseUrl}/api/transactions/${TrackerId}`);
}

export const getTransactionSummary = (TrackerId) =>{
    return axios.get(`${baseUrl}/api/transactions/summary/${TrackerId}`);
}

export const saveTransactionSummary = (TrackerId,data) =>{
    return axios.post(`${baseUrl}/api/transactions/${TrackerId}`,data);
}

export const createTracker = (data) =>{
    return axios.post(`${baseUrl}/api/tracker`,data);
}

export const removeTransaction = (transactionId) =>{
    return axios.delete(`${baseUrl}/api/transactions/${transactionId}`);
}