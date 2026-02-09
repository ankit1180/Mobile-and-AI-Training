import express from "express";
import dotenv from "dotenv";
import { addTask, findAll, updateTask, deleteTask, getTodayTask, getRecentlyAssignedTask, getPreviouslyAssignedTask, setTaskCompleted, getCompletedTask } from "./Controller/TaskController.js";
import cors from "cors";

import connectDB from "./Config/DB.js";
dotenv.config();

connectDB();
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8888;



app.get("/", (req, res) => {
    res.send("Application Started!!");
})


app.post("/add-task", addTask);
app.get("/find-all-task", findAll);
app.patch("/update-task/:id", updateTask);
app.delete("/delete-task/:id", deleteTask);
app.get("/today-assigned-task", getTodayTask);
app.get("/recently-assigned-task", getRecentlyAssignedTask);
app.get("/previously-assigned-task", getPreviouslyAssignedTask);
app.put("/complete-task", setTaskCompleted);
app.get("/completed-tasks", getCompletedTask);
app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
})



