import mongoose from "mongoose";
import { Role } from "../Enums/Roles.Enums.js";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER,
    },
    refreshToken: { type: String }
});


userSchema.virtual("blogs", {
    ref: "Blog",         
    localField: "_id",   
    foreignField: "author"
});


userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export default mongoose.model("User", userSchema);
