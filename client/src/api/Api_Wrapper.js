// api_wrapper.js

import axios from 'axios';

const baseURL = 'http://localhost:4000'; // Replace with your API base URL

const api_wrapper = axios.create({
    baseURL,
});

// Function to set authorization header for authenticated requests
export function setAuthorizationHeader(token) {
    if (token) {
        api_wrapper.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token); // Store token in local storage
    } else {
        delete api_wrapper.defaults.headers.common['Authorization'];
        localStorage.removeItem('token'); // Remove token from local storage
    }
}

// Function to make a POST request for sign-in
export async function signIn(data) {
    try {
        const response = await api_wrapper.post('/users/login', data);
        const { token } = response.data;
        setAuthorizationHeader(token); 
        return response.data;
    } catch (error) {
        return error?.response?.data;
    }
}

// Function to make a POST request for sign-up
export async function signUp(data) {
    try {
        const response = await api_wrapper.post('/users/register', data);
        // const { token } = response.data;
        // setAuthorizationHeader(token); // Set authorization header and store token in local storage
        return response.data;
    } catch (error) {
        return error?.response?.data
        // throw error.response.data;
    }
}

// Example of a function that makes an authenticated GET request
// export async function fetchUserData() {
//     try {
//         const response = await api_wrapper.get('/user-data');
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// }

// Check if there is a token in local storage on initial load
const storedToken = localStorage.getItem('token');
if (storedToken) {
    setAuthorizationHeader(storedToken);
}

export const BaseImageUrl = "http://localhost:4000/images"

export default api_wrapper;
