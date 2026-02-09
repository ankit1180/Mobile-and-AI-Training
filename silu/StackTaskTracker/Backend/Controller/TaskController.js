import { error } from "console";
import Priority from "../Enums/PriorityEnum.js";
import Task from "../Models/Task.Model.js"


const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const priorityValidator = (req) => {
    const priority = req.body.priority;
    if (priority.toLocaleLowerCase() === (Priority.High).toLocaleLowerCase()) {
        req.body.priority = Priority.High;
    } else if (priority.toLocaleLowerCase() === (Priority.Low).toLocaleLowerCase()) {
        req.body.priority = Priority.Low;
    } else if (priority.toLocaleLowerCase() === (Priority.Medium).toLocaleLowerCase()) {
        req.body.priority = Priority.Medium;
    } else {
        throw new Error("Enter a Valid Priority {High, Medium, Low}!!");
    }
}


const dateValidator = (date, flag) => {
    if (typeof date !== "string") {
        throw new Error("Invalid date input");
    }
    const parsedDate = new Date(date);
    const today = new Date();
    parsedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (flag) {
        // if (parsedDate.getFullYear() === today.getFullYear() &&
        //     parsedDate.getMonth() === today.getMonth() &&
        //     parsedDate.getDate() === today.getDate()) {
        //     return parsedDate;
        // } else {
        //     throw new Error("Assigned date should be same as today date!!");
        // }

        if (parsedDate.getFullYear() === today.getFullYear() &&
            parsedDate.getMonth() === today.getMonth() &&
            parsedDate.getDate() <= today.getDate()) {
            return parsedDate;
        } else {
            throw new Error("Assigned date should be same as today date!!");
        }
    }

    if (parsedDate < today) {
        throw new Error("Date Must be in future!!");
    }

    return parsedDate;
};




export const addTask = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Task Not found" });
        }
        const { task_name, assigned_date, due_date, priority } = req.body;
        if (!task_name) {
            return res.status(400).json({ error: "Task name is required!" });
        }

        const taskCheck = await Task.find({
            task_name: task_name.toLocaleLowerCase()
        });



        if (taskCheck.length > 0) {
            for (let task of taskCheck) {
                if (!task.isCompleted) {
                    return res.status(400).json({ error: "Task allready exist" });
                }
            }
        }
        if (priority) {
            try {
                priorityValidator(req);
            } catch (err) {
                return res.status(400).json({ error: err.message });
            }
        }

        if (assigned_date) {
            try {
                req.body.assigned_date = dateValidator(assigned_date, true);
            } catch (err) {
                return res.status(400).json({ error: err.message });
            }
        }

        if (due_date) {
            try {
                console.log("Due Date : ", due_date)
                req.body.due_date = dateValidator(due_date);
            } catch (err) {
                return res.status(400).json({ error: err.message });
            }
        }
        const task = await Task.create(req.body);
        res.status(201).json({ message: "Task Added Successfully", data: task });

    } catch (err) {

        res.status(500).json({ error: err.message });
    }
}

export const findAll = async (req, res) => {
    try {
        const tasks = await Task.find();

        if (tasks.length === 0) {
            return res.status(404).json({ message: "No Tasks Found, Task List is empty" });
        }

        res.status(200).json({ message: "Task List", data: tasks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { task_name, assigned_date, due_date, priority, isCompleted } = req.body;
        if(isCompleted){
            return res.status(400).json({error:"Task can not be completed"});
        }
        if (!id || !task_name) {
            return res.status(400).json({ error: "task not found!" });
        }

        const checkTaskByID = await Task.findById(id);

        if (!checkTaskByID) {
            return res.status(400).json({ error: "Task not found!" })
        }


        const checkTaskByName = await Task.find({
            task_name: task_name.toLocaleLowerCase()
        });

        if (checkTaskByName.length > 0) {
            for (let task of checkTaskByName) {
                if (!task.isCompleted && task._id != id) {
                    return res.status(400).json({ error: "Task allready exist" });
                }
            }
        }


        if (priority) {
            try {
                priorityValidator(req);
            } catch (err) {
                return res.status(400).json({ error: err.message });
            }
        }

        if (assigned_date) {
            try {
                req.body.assigned_date = dateValidator(assigned_date, true);
            } catch (err) {
                return res.status(400).json({ error: err.message });
            }
        }

        if (due_date) {
            try {
                console.log("Due Date : ", due_date)
                req.body.due_date = dateValidator(due_date);
            } catch (err) {
                return res.status(400).json({ error: err.message });
            }
        }

        const task = await Task.updateOne(
            { _id: id },
            { $set: req.body }
        );

        res.status(201).json({ message: "Task Updated Successfully", data: task });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const deleteTask = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json('Task not found!');
    }

    const checkTask = await Task.findById(id);
    if (!checkTask) {
        return res.status(400).json({ error: "Task not found!" })
    }

    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            res.status(400).json({ error: 'Task not found!' });
        } else {
            res.status(200).json({ message: 'Task Deleted Successfully', data: task });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getTodayTask = async (req, res) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);
    try {
        const todayAssignedTask = await Task.find({
            assigned_date: {
                $gte: start,
                $lte: end
            },
            isCompleted: false
        }).lean();

        if (!todayAssignedTask || todayAssignedTask.length === 0) {
            return res.status(400).json({ error: "Task Not found!!" });
        }


        const transformedTasks = todayAssignedTask.map(task => ({
            ...task,
            due_date: "today",
            assigned_date: "today"
        }));

        res.status(200).json({
            message: "Today Assigned Task",
            data: transformedTasks
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



export const getRecentlyAssignedTask = async (req, res) => {
    const end_date = new Date();
    end_date.setDate(end_date.getDate() - 1);
    end_date.setHours(23, 59, 59, 999);

    const start_date = new Date();
    start_date.setDate(end_date.getDate() - 5);
    start_date.setHours(0, 0, 0, 0);
    try {
        const recentlyAssignedTask = await Task.find({
            assigned_date: {
                $gte: start_date,
                $lte: end_date
            },
            isCompleted: false
        }).lean();

        if (!recentlyAssignedTask || recentlyAssignedTask.length === 0) {
            return res.status(400).json({ error: "Task Not found!!" });
        }

        const transformedTasks = recentlyAssignedTask.map(task => ({
            ...task,
            due_date: new Date(task.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
            assigned_date: new Date(task.assigned_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
        }));

        res.status(200).json({
            message: "Recently Assigned Task",
            data: transformedTasks
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getPreviouslyAssignedTask = async (req, res) => {
    const end_date = new Date();
    end_date.setDate(end_date.getDate() - 7);
    end_date.setHours(23, 59, 59, 999);
    try {

        const previouslyAssignedTask = await Task.find({
            assigned_date: {
                $lte: end_date
            },
            isCompleted: false
        }).lean();


        if (!previouslyAssignedTask || previouslyAssignedTask.length === 0) {
            return res.status(400).json({ error: "Task Not found!!" });
        }

        const transformedTasks = previouslyAssignedTask.map(task => ({
            ...task,
            due_date: new Date(task.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
            assigned_date: new Date(task.assigned_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
        }));


        res.status(200).json({
            message: "Prevously Assigned Task",
            data: transformedTasks
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const setTaskCompleted = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Task not found" });
        }

        if (!req.body.isCompleted) {
            return res.status(400).json({ error: "Complete the task!!" });
        }
        const { task_name, due_date, priority } = req.body;
        if (!task_name) {
            return res.status(400).json({ error: "Task name is required!" });
        }

        const tasks = await Task.find({
            task_name: task_name.toLocaleLowerCase()
        });

        if (tasks.length > 0) {
            tasks[0].isCompleted = true;
            const task = await Task.updateOne(
                { task_name: tasks[0].task_name },
                { $set: tasks[0] }
            );
            console.log("Task is " + task);
            return res.status(200).json({ message: "Task Completed Successfully", data: task });
        } else {

            return res.status(400).json({ error: "Task not found" });
        }


    } catch (err) {
        console.log("We got error");
        res.status(500).json({ error: err.message });
    }
}

export const getCompletedTask = async (req, res) => {
    try {
        const tasks = await Task.find({ isCompleted: true }).lean();
        if (!tasks || tasks.length == 0) {
            return res.status(400).json({ error: "Task Not found !!!" });
        }

        const transformedTasks = tasks.map(task => ({
            ...task,
            due_date: new Date(task.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
        }));


        res.status(200).json({ message: "Completed Tasks", data: transformedTasks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}