
import axios from 'axios';

// const baseUrl = "https://hishobh.herokuapp.com";
// const baseUrl = "http://localhost:5000";


const Instance = axios.create({
    baseURL: 'https://hishobh.herokuapp.com',
    timeout: 50000,
});

Instance.interceptors.response.use(response => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
})


export const getTrackers = (userID) => {
    return Instance.post(`/api/tracker/${userID}`);
}

export const getTransactions = (TrackerId) => {
    return Instance.get(`/api/transactions/${TrackerId}`);
}

export const getTransactionSummary = (TrackerId) => {
    return Instance.get(`/api/transactions/summary/${TrackerId}`);
}

export const saveTransactionSummary = (TrackerId, data) => {
    return Instance.post(`/api/transactions/${TrackerId}`, data);
}

export const createTracker = (data) => {
    return Instance.post(`/api/tracker`, data);
}

export const removeTransaction = (transactionId) => {
    return Instance.delete(`${baseUrl}/api/transactions/${transactionId}`);
}

export const createSubscription = (data) => {
    return Instance.post(`/api/subscriptions/5f12d02af766c92214dd5eee`, data);
}

export const getSubscription = (data) => {
    return Instance.get(`/api/subscriptions/5f12d02af766c92214dd5eee`);
}