import axios from 'axios';

const API = axios.create({
    // baseURL: 'https://gymrat-o2cw.onrender.com/api',
    baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to include the JWT token in all requests
API.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user && user.token) {
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
});

export default API;
