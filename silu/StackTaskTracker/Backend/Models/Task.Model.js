import mongoose from "mongoose";
import Priority from "../Enums/PriorityEnum.js";

const TaskSchema = new mongoose.Schema({
    task_name: { type: String, lowercase: true },
    assigned_date: { type: Date, default: Date.now },
    due_date: { type: Date, default: Date.now },
    priority: { type: String, enum: Object.values(Priority), default: Priority.Low },
    isCompleted: { type: Boolean, default: false }
});

export default mongoose.model("Task", TaskSchema);