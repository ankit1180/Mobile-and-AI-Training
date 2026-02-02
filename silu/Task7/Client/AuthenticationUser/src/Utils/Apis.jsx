import axios from "axios";


const BASE_URL = "http://localhost:8080";

// add user
export const registerUser = (user) => {
    return axios.post(`${BASE_URL}/register`, user);
};

// get all users
export const loginUser = (user) => {
    return axios.post(`${BASE_URL}/login`, user);
};