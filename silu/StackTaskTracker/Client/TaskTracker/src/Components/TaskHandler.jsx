import React from "react";

const TaskHandler = ({
    tasks,
    checked,
    updatingTaskId,
    editingTask,
    handelCompletedTask,
    handleChange,
    saveTask,
    updateTask,
    deleteTask
}) => {

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High":
                return "bg-red-100 text-red-800 border-red-300";
            case "Medium":
                return "bg-yellow-100 text-yellow-800 border-yellow-300";
            case "Low":
                return "bg-green-100 text-green-800 border-green-300";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };

    return (
        <div>
            {tasks.length === 0 ? (
                <div className="text-center text-gray-400 p-6">
                    No tasks found
                </div>
            ) : (
                tasks.map(task => (
                    <div
                        key={task._id}
                        className="flex items-center gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        {/* Checkbox */}
                        {!task.isCompleted ? (
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => handelCompletedTask(task)}
                                className="w-5 h-5 rounded border-gray-300 text-blue-600 cursor-pointer"
                            />
                        ) : (
                            <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}

                        {/* Task Name */}
                        <div className="flex-1">
                            {editingTask?._id === task._id
                                ? (
                                    <input
                                        type="text"
                                        name="task_name"
                                        value={editingTask.task_name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Task name"
                                    />
                                ) : (
                                    <span className={`text-gray-800 font-medium ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                                        {task.task_name}
                                    </span>
                                )}
                        </div>

                        {/* Assigned Date */}
                        <div className="w-32">
                            {editingTask?._id === task._id
                                ? (
                                    <input
                                        type="date"
                                        name="assigned_date"
                                        value={editingTask.assigned_date}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <span className={`text-sm ${task.isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {task.assigned_date}
                                    </span>
                                )}
                        </div>
                        {/* Due Date */}
                        <div className="w-32">
                            {editingTask?._id === task._id
                                ? (
                                    <input
                                        type="date"
                                        name="due_date"
                                        value={editingTask.due_date}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <span className={`text-sm ${task.isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {task.due_date}
                                    </span>
                                )}
                        </div>

                        {/* Priority */}
                        <div className="w-24">
                            {editingTask?._id === task._id
                                ? (
                                    <select
                                        name="priority"
                                        value={editingTask.priority}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                ) : (
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                                        {task.priority}
                                    </span>
                                )}
                        </div>

                        {/* Actions */}
                        <div className="w-40 flex justify-center gap-2">
                            {!task.isCompleted && (
                                editingTask?._id === task._id
                                    ? (
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                            onClick={() => saveTask(task._id)}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                                onClick={() => updateTask(task)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                                onClick={() => deleteTask(task._id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )
                            )}
                            {task.isCompleted && (
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    onClick={() => deleteTask(task._id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskHandler;
