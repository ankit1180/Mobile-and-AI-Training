import User from "../Model/User.Model.js";
import Blog from "../Model/Blog.Model.js";

export const viewAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return users.length == 0 ? res.status(400).json("User List Empty!!") : res.status(200).json({ message: "User List", data: users });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

export const viewAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        return blogs.length == 0 ? res.status(400).json("Blog List Empty!!") : res.status(200).json({ message: "BLog List", data: blogs });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}