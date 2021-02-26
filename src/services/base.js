
import axios from 'axios';

const baseUrl = "https://hishobh.herokuapp.com";
// const baseUrl = "http://localhost:5000";


const Instance = axios.create({
    baseURL: baseUrl,
    timeout: 50000,
});

Instance.interceptors.response.use(response => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
})


export const getTrackers = (userID, data = {}) => {
    return Instance.post(`/api/tracker/${userID}`, data);
}

export const getTransactions = (TrackerId, payload) => {
    return Instance.post(`/api/transactions/${TrackerId}`, { filter: payload });
}

export const getTransactionSummary = (TrackerId) => {
    return Instance.get(`/api/transactions/summary/${TrackerId}`);
}

export const saveTransactionSummary = (TrackerId, data) => {
    return Instance.post(`/api/transactions/create/${TrackerId}`, data);
}

export const createTracker = (data) => {
    return Instance.post(`/api/tracker`, data);
}

export const removeTransaction = (transactionId) => {
    return Instance.delete(`/api/transactions/${transactionId}`);
}

export const createSubscription = (data) => {
    return Instance.post(`/api/subscriptions/5f12d02af766c92214dd5eee`, data);
}

export const getSubscription = (data) => {
    return Instance.get(`/api/subscriptions/5f12d02af766c92214dd5eee`);
}

export const deleteSubscription = (uid = "", sid = "") => {
    return Instance.delete(`/api/subscriptions/5f12d02af766c92214dd5eee/${sid}`);
}

export const lockTracker = (trackerId) => {
    return Instance.post(`/api/tracker/lock`, trackerId);
}

export const filterTransaction = (trackerId, payload) => {
    return Instance.post(`/api/transactions/filter${trackerId}`, payload);
}


export const getCategories = () => {
    return Instance.get(`/api/category`);
}

export const addCategory = (payload) => {
    return Instance.post(`/api/category`, payload);
}

export const updateCategory = (categoryId, payload) => {
    return Instance.post(`/api/category/${categoryId}`, payload);
}

export const deleteCategory = (categoryId) => {
    return Instance.delete(`/api/category/${categoryId}`);
}

export const SummaryByCategory = () => {
    return Instance.get(`/api/transactions/category/sum/601a9090f0ad480017022e12`);
}





