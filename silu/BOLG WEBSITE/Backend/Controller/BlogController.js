import User from "../Model/User.Model.js"
import Blog from "../Model/Blog.Model.js"


export const createBlog = async (req, res) => {
    try {
        const blog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        });
        return res.status(201).json({ blog });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const viewOwnBlogs = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id.trim().length === 0) {
            return res.status(400).json({ error: "User not found" });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const blogList = await Blog.find({ author: user._id });
        if (blogList.length == 0) {
            return res.status(400).json({ message: "User has not written any blogs" });
        }
        return res.status(200).json({ message: "Blogs written by " + user.name, data: blogList });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}


export const deleteBlog = async (req, res) => {
    try {
        await Blog.deleteOne({ _id: req.blog._id });
        return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const editBlog = async (req, res) => {

    req.blog.content = req.body.content ? req.body.content : blog.content;
    req.blog.title = req.body.title ? req.body.title : blog.title;

    try {
        const updated_blog = await Blog.updateOne(
            { _id: req.blog._id },
            {
                $set: {
                    title: req.blog.title,
                    content: req.blog.content
                }
            }
        );

        return res.status(200).json({ message: "Blog Updated Successfully!!", data: updated_blog });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};


export const getUsersWithBlogs = async (req, res) => {
    try {
        const users_blogs = await User.find().populate("blogs");
        return users_blogs.length === 0 ? res.status(500).json({ error: "Blog list empty" }) : res.status(200).json({ message: "All users with their blogs", data: users_blogs });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};
