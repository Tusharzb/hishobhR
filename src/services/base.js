import axios from 'axios'

const baseUrl = "http://localhost:5000";

export const getTrackers = (userID,payload={}) =>{
    return axios.post(`${baseUrl}/api/tracker/${userID}`,payload);
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

export const lockTracker = (payload) =>{
    return axios.post(`${baseUrl}/api/tracker/lock`,payload);
}