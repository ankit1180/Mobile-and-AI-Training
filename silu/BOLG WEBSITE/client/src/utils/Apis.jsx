import axios from "axios";

const USER_REGISTER_URI = import.meta.env.VITE_USER_REGISTER_URI;
const USER_LOGIN_URI = import.meta.env.VITE_USER_LOGIN_URI;
const CREATE_BLOG_URI = import.meta.env.VITE_CREATE_BLOG_URI;
const GET_OWN_BLOGS_URI = import.meta.env.VITE_GET_OWN_BLOGS_URI;
const DELETE_BLOG_URI = import.meta.env.VITE_DELETE_BLOG_URI;
const EDIT_BLOG_URI = import.meta.env.VITE_EDIT_BLOG_URI;
const ALL_USERS_URI = import.meta.env.VITE_ALL_USERS_URI;
const ALL_BLOGS_URI = import.meta.env.VITE_ALL_BLOGS_URI;
const ALL_USERS_BLOGS_URI = import.meta.env.VITE_ALL_USERS_BLOGS_URI;


export const userRegisterApi = async (user) => {
    try {
        const response = await axios.post(USER_REGISTER_URI, user);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const userLoginApi = async (user) => {
    try {
        const response = await axios.post(USER_LOGIN_URI, user, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const createBlogApi = async (blog) => {
    try {
        const response = await axios.post(CREATE_BLOG_URI, blog, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const viewOwnBlogsApi = async (id) => {
    try {
        const response = await axios.get(`${GET_OWN_BLOGS_URI}${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const deleteBlogApi = async (blog) => {
    try {
        const response = await axios.delete(DELETE_BLOG_URI, {
            data: blog, 
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const editBlogApi = async (blog) => {
    try {
        const response = await axios.put(EDIT_BLOG_URI, blog, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};


export const viewAllUsersApi = async () => {
    try {
        const response = await axios.get(ALL_USERS_URI, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const viewAllBlogsApi = async () => {
    try {
        const response = await axios.get(ALL_BLOGS_URI, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const viewAllUsersBlogsApi = async () => {
    try {
        const response = await axios.get(ALL_USERS_BLOGS_URI, {
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};
