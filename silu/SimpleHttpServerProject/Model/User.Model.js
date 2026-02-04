import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        company: { type: String, required: true },
        website: { type: String, required: true }
    }
);

export default mongoose.model("User", userSchema);
