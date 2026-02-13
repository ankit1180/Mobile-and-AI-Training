import Blog from "../Model/Blog.Model.js"
import {Role} from "../Enums/Roles.Enums.js"

export const isBlogExist = async (req, res, next) => {
    try {
        const { blogId } = req.body;

        if (!blogId || blogId.trim().length === 0) {
            return cb(new Error("Blog Not found"));
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return cb(new Error("Blog Not found"));
        }
        req.blog = blog;
        next();

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};



export const doesUserHasPermission = (req, res, join) => {
    if ((req.user.role === Role.ADMIN) || (req.user._id.equals(req.blog.author))) {
        join();
    }else{
        return res.status(401).json({error : "Permission Not Allowed"})
    }
};