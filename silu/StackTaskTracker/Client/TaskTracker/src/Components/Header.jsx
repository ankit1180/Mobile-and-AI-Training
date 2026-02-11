import React, { useState, useEffect } from "react";
import AddTask from "./AddTask";
import { findTaskApi, deleteTaskApi, updateTaskApi, todayAssignedTaskApi, getRecentlyAssignedTask, previouslyAssignedTaskAPi, completedTasksApi, setCompletedTaskApi } from "../Utils/Apis";
import TaskHandler from "./TaskHandler";

const Header = () => {
    const [addBtn, setAddBtn] = useState(false);
    const [tasks, setTasks] = useState({
        todayAssignedTask: [],
        recentlyAssignedTask: [],
        previouslyAssignedTask: [],
        completedTask: []
    });
    const [updatingTaskId, setUpdatingTaskId] = useState(null);
    const [editingTask, setEditingTask] = useState(null);


    const [checked, setCheck] = useState(false);

    const findAllTask = async () => {
        try {
            const res = await findTaskApi();
            setTasks(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);
        }
    };

    const findTodayAssignedTask = async () => {
        try {
            const res = await todayAssignedTaskApi();
            setTasks(prev => ({
                ...prev,
                todayAssignedTask: Array.isArray(res.data) ? res.data : []
            }));
        } catch (err) {
            console.log(err);
        }
    }

    const findRecentlyAssignedTask = async () => {
        try {
            const res = await getRecentlyAssignedTask();
            setTasks(prev => ({
                ...prev,
                recentlyAssignedTask: Array.isArray(res.data) ? res.data : []
            }));
        } catch (err) {
            console.log(err);
        }
    }

    const findPreviouslyAssignedTask = async () => {
        try {
            const res = await previouslyAssignedTaskAPi();
            setTasks(prev => ({
                ...prev,
                previouslyAssignedTask: Array.isArray(res.data) ? res.data : []
            }));
        } catch (err) {
            console.log(err);
        }
    }

    const getCompletedTask = async () => {
        try {
            const res = await completedTasksApi();
            setTasks(prev => ({
                ...prev,
                completedTask: Array.isArray(res.data) ? res.data : []
            }));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        findTodayAssignedTask();
        findRecentlyAssignedTask();
        findPreviouslyAssignedTask();
        getCompletedTask();
    }, []);

    const addBtnHandler = () => {
        setAddBtn(true);
    };

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskApi(id);
            alert(res.message);
            setTasks(prev => ({
                todayAssignedTask: prev.todayAssignedTask.filter(t => t._id !== id),
                recentlyAssignedTask: prev.recentlyAssignedTask.filter(t => t._id !== id),
                previouslyAssignedTask: prev.previouslyAssignedTask.filter(t => t._id !== id),
                completedTask: prev.completedTask.filter(t => t._id !== id)
            }));
        } catch (err) {
            alert(err.response?.data?.error || "Error deleting task");
        }
    };

    const updateTask = (task) => {
        setEditingTask(task);
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingTask(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handelCompletedTask = async (task) => {
        try {
            if (editingTask.task_name !== "") {
                console.log("EditingTask name ; ", editingTask.task_name)
                alert("Task can not be completed");
                return;
            }
            task.isCompleted = true;
            const res = await setCompletedTaskApi(task);
            alert(res.message);
            setTasks(prev => ({
                todayAssignedTask: prev.todayAssignedTask.filter(t => t._id !== task._id),
                recentlyAssignedTask: prev.recentlyAssignedTask.filter(t => t._id !== task._id),
                previouslyAssignedTask: prev.previouslyAssignedTask.filter(t => t._id !== task._id),
                completedTask: [
                    ...prev.completedTask,
                    {
                        ...prev.todayAssignedTask.find(t => t._id === task._id) ||
                        prev.recentlyAssignedTask.find(t => t._id === task._id) ||
                        prev.previouslyAssignedTask.find(t => t._id === task._id),
                        isCompleted: true
                    }
                ]
            }))
        } catch (err) {
            alert(err.response?.data?.error || "Error completing task");
        }
    };

    const saveTask = async () => {
        try {

            const res = await updateTaskApi(editingTask._id, editingTask);
            alert(res.message);

            const parsedDate = new Date(editingTask.assigned_date);
            const today = new Date();
            parsedDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            const diffDays = Math.round(Math.abs(today - parsedDate) / (1000 * 60 * 60 * 24));


            setTasks(prev => {

                const filtered = {
                    todayAssignedTask: prev.todayAssignedTask.filter(t => t._id !== editingTask._id),
                    recentlyAssignedTask: prev.recentlyAssignedTask.filter(t => t._id !== editingTask._id),
                    previouslyAssignedTask: prev.previouslyAssignedTask.filter(t => t._id !== editingTask._id),
                    completedTask: prev.completedTask
                };


                if (diffDays === 0) {
                    filtered.todayAssignedTask.push(editingTask);
                } else if (diffDays <= 6) {
                    filtered.recentlyAssignedTask.push(editingTask);
                } else {
                    filtered.previouslyAssignedTask.push(editingTask);
                }

                return filtered;
            });


            setEditingTask({
                task_name: "",
                assigned_date: "",
                due_date: "",
                priority: "Low"
            });
            setUpdatingTaskId(null);

        } catch (err) {
            alert(err.response?.data?.error || "Error updating task");
            setUpdatingTaskId(null);
        }
    };


    const totalTasks = tasks.todayAssignedTask.length + tasks.recentlyAssignedTask.length + tasks.previouslyAssignedTask.length;

    return (
        <div className="min-h-screen w-full bg-gray-900 flex justify-center items-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">

                {/* Header */}
                <div className="bg-blue-600 p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-white">My Tasks</h1>
                            <p className="text-blue-100 text-sm mt-1">
                                {totalTasks} active • {tasks.completedTask.length} completed
                            </p>
                        </div>
                        <button
                            className="bg-white text-blue-600 font-semibold px-5 py-2 rounded-lg hover:bg-blue-50"
                            onClick={addBtnHandler}
                        >
                            + Add Task
                        </button>
                    </div>
                </div>

                {/* Table Header */}
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                    <div className="flex gap-4 text-xs font-semibold text-gray-600 uppercase">
                        <span className="w-10"></span>
                        <span className="flex-1">Task Name</span>
                        <span className="w-32">Assigned Date</span>
                        <span className="w-32">Due Date</span>
                        <span className="w-24">Priority</span>
                        <span className="w-40 text-center">Actions</span>
                    </div>
                </div>

                {/* Tasks List */}
                <div className="h-96 overflow-y-auto">

                    {/* Today's Tasks */}
                    {tasks.todayAssignedTask.length > 0 && (
                        <div>
                            <div className="bg-orange-50 px-6 py-2 border-b border-orange-200">
                                <h2 className="text-sm font-bold text-orange-800">
                                    Today's Tasks ({tasks.todayAssignedTask.length})
                                </h2>
                            </div>
                            <TaskHandler
                                tasks={tasks.todayAssignedTask}
                                checked={checked}
                                updatingTaskId={updatingTaskId}
                                editingTask={editingTask}
                                handelCompletedTask={handelCompletedTask}
                                handleChange={handleChange}
                                saveTask={saveTask}
                                updateTask={updateTask}
                                deleteTask={deleteTask}
                            />
                        </div>
                    )}

                    {/* Recently Assigned */}
                    {tasks.recentlyAssignedTask.length > 0 && (
                        <div>
                            <div className="bg-blue-50 px-6 py-2 border-b border-blue-200">
                                <h2 className="text-sm font-bold text-blue-800">
                                    Recently Assigned ({tasks.recentlyAssignedTask.length})
                                </h2>
                            </div>
                            <TaskHandler
                                tasks={tasks.recentlyAssignedTask}
                                checked={checked}
                                updatingTaskId={updatingTaskId}
                                editingTask={editingTask}
                                handelCompletedTask={handelCompletedTask}
                                handleChange={handleChange}
                                saveTask={saveTask}
                                updateTask={updateTask}
                                deleteTask={deleteTask}
                            />
                        </div>
                    )}

                    {/* Previously Assigned */}
                    {tasks.previouslyAssignedTask.length > 0 && (
                        <div>
                            <div className="bg-purple-50 px-6 py-2 border-b border-purple-200">
                                <h2 className="text-sm font-bold text-purple-800">
                                    Previously Assigned ({tasks.previouslyAssignedTask.length})
                                </h2>
                            </div>
                            <TaskHandler
                                tasks={tasks.previouslyAssignedTask}
                                checked={checked}
                                updatingTaskId={updatingTaskId}
                                editingTask={editingTask}
                                handelCompletedTask={handelCompletedTask}
                                handleChange={handleChange}
                                saveTask={saveTask}
                                updateTask={updateTask}
                                deleteTask={deleteTask}
                            />
                        </div>
                    )}

                    {/* Completed Tasks */}
                    {tasks.completedTask.length > 0 && (
                        <div>
                            <div className="bg-green-50 px-6 py-2 border-b border-green-200">
                                <h2 className="text-sm font-bold text-green-800">
                                    Completed ({tasks.completedTask.length})
                                </h2>
                            </div>
                            <TaskHandler
                                tasks={tasks.completedTask}
                                checked={checked}
                                updatingTaskId={updatingTaskId}
                                editingTask={editingTask}
                                handelCompletedTask={handelCompletedTask}
                                handleChange={handleChange}
                                saveTask={saveTask}
                                updateTask={updateTask}
                                deleteTask={deleteTask}
                            />
                        </div>
                    )}

                    {/* Empty State */}
                    {totalTasks === 0 && tasks.completedTask.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
                            <p className="text-lg font-medium">No tasks yet</p>
                            <p className="text-sm mt-2">Click "Add Task" to get started</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Task Modal */}
            {addBtn && (
                <AddTask
                    onClose={() => setAddBtn(false)}
                    onTaskAdded={() => {
                        findTodayAssignedTask();
                        findRecentlyAssignedTask();
                        findPreviouslyAssignedTask();
                    }}
                />
            )}
        </div>
    );
};

export default Header;
