import React, { useState } from "react";

function TodoList() {
    const [task, setTask] = useState([]);
    const [text, setText] = useState("");

    const addTask = () => {
        if (text.trim() === "") return;
        setTask([...task, text]);
        setText("");
    };


    const deleteItem = (idx) => {
        setTask(task.filter((_, index) => index !== idx));
    };

    return (
        <div className="h-100 flex justify-center items-center">
            <div className="w-100 bg-indigo-500 text-center break-words rounded text-white p-4">
                <label htmlFor="text" className="pr-5">Enter Any Task</label><br />

                <input type="text" id="text" value={text} onChange={(e) => setText(e.target.value)} className="border mt-2 rounded text-black" />

                <button className="bg-blue-500 p-2 ml-2 hover:bg-fuchsia-500 rounded" onClick={() => addTask()}>Add</button>
                <button className="bg-blue-500 p-2 ml-2 hover:bg-fuchsia-500 rounded" onClick={() => setTask([])}>Clear</button>

                {task.map((t, idx) => (
                    <li key={idx} className="mt-3">
                        Task-{idx + 1} : {t}
                        <button className="bg-black p-1 ml-2 hover:bg-fuchsia-500 rounded" onClick={() => deleteItem(idx)}> Completed </button>
                    </li>
                ))}

            </div>
        </div>
    );
}

export default TodoList;