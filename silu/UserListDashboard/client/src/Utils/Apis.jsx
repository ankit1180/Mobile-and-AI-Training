import axios from "axios";


const BASE_URL = "http://localhost:8080";

// add user
export const addUserApi = (user) => {
    return axios.post(`${BASE_URL}/add`, user);
};

// get all users
export const getAllUsersApi = () => {
    return axios.get(`${BASE_URL}/findall`);
};

// delete user
export const deleteUserApi = (id) => {
    return axios.delete(`${BASE_URL}/delete/${id}`);
};

// update user
export const updateUserApi = (id, user) => {
    return axios.post(`${BASE_URL}/update/${id}`, user);
};

// find user by name
export const findByName = (name)=>{
    return axios.get(`${BASE_URL}/findByName/${name}`)
}