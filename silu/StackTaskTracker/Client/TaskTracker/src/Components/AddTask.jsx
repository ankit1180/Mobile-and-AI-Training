import React from "react";
import { useState, useEffect } from "react";
import { addTaskApi } from "../Utils/Apis";

function AddTask({ onClose, onTaskAdded }) {
    const [task, setTask] = useState({
        task_name: "",
        assigned_date: "",
        due_date: "",
        priority: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            task_name: task.task_name,
            assigned_date: task.assigned_date,
            due_date: task.due_date,
            priority: task.priority
        };

        try {
            const res = await addTaskApi(payload);
            alert(res.message);
            onTaskAdded();
            onClose();
        } catch (err) {
            alert(err.response.data.error);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            {/* Modal Container */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">

                {/* Header */}
                <div className="bg-blue-600 px-6 py-4 rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-xl text-white">Add New Task</h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-blue-700 rounded p-1"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {/* Task Name Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Task Name
                        </label>
                        <input
                            name="task_name"
                            placeholder="Enter task name"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    {/*Assigned Date Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Assigned Date
                        </label>
                        <input
                            name="assigned_date"
                            type="date"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Due Date Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Due Date
                        </label>
                        <input
                            name="due_date"
                            type="date"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Priority Select */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Priority Level
                        </label>
                        <select
                            name="priority"
                            onChange={handleChange}
                            required
                            defaultValue=""
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value="" disabled>Select Priority Level</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
                        >
                            Save Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTask;
