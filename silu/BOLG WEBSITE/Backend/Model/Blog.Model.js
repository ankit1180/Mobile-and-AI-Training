import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.ObjectId, required: true, ref: "User" }
});

export default mongoose.model("Blog", blogSchema)
