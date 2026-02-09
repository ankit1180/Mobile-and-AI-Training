import axios from "axios";
const ADD_TASK_URI = import.meta.env.VITE_ADD_TASK_URI;
const FIND_TASK_URI = import.meta.env.VITE_FIND_ALL_TASK_URI;
const DELETE_TASK_URI = import.meta.env.VITE_DELETE_TASK_URI;
const UPDATE_TASK_URI = import.meta.env.VITE_UPDATE_TASK_URI;
const TODAY_ASSIGNED_TASK_URI = import.meta.env.VITE_TODAY_ASSIGNED_TASK_URI;
const RECENTLY_ASSIGNED_TASK_URI = import.meta.env.VITE_RECENTLY_ASSIGNED_TASK_URI;
const PREVIOUSLY_ASSIGNED_TASK_URI = import.meta.env.VITE_PREVIOUSLY_ASSIGNED_TASK_URI;
const SET_COMPLETED_TASK_URI = import.meta.env.VITE_SET_COMPLETED_TASK_URI;
const COMPLETED_TASKS_URI = import.meta.env.VITE_COMPLETED_TASKS_URI;



export const addTaskApi = async (task) => {

    try {
        const response = await axios.post(ADD_TASK_URI, task);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const findTaskApi = async () => {
    try {
        const response = await axios.get(FIND_TASK_URI);
        return response.data;
    } catch (err) {
        throw err
    }
}

export const deleteTaskApi = async (id) => {
    try {
        const response = await axios.delete(`${DELETE_TASK_URI}/${id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}


export const updateTaskApi = async (id, task) => {
    try {
        const response = await axios.patch(`${UPDATE_TASK_URI}/${id}`, task);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const todayAssignedTaskApi = async () => {
    try {
        const response = await axios.get(TODAY_ASSIGNED_TASK_URI);
        return response.data;
    } catch (err) {
        throw err;
    }
}



export const getRecentlyAssignedTask = async () => {
    try {
        const response = await axios.get(RECENTLY_ASSIGNED_TASK_URI);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const previouslyAssignedTaskAPi = async () => {
    try {
        const response = await axios.get(PREVIOUSLY_ASSIGNED_TASK_URI);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const setCompletedTaskApi = async (task) => {
    try {
        const response = await axios.put(SET_COMPLETED_TASK_URI, task);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const completedTasksApi = async () => {
    try {
        const response = await axios.get(COMPLETED_TASKS_URI);
        return response.data;
    } catch (err) {
        throw err;
    }
}
