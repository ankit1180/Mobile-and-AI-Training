import User from "../Model/User.Model.js"
import { Role, RolePermission } from "../Enums/Roles.Enums.js"

export const isUserExistForBlog = async (req, res, next) => {
    try {
        const { title, content, author, action } = req.body;
        if (
            !title || title.trim().length === 0 ||
            !content || content.trim().length === 0 ||
            !author || author.trim().length === 0 ||
            !action || action.trim().length === 0
        ) {
            return res.status(400).json({ message: "Please enter all the  !" });
        }

        const user = await User.findById(author);
        if (!user) {
            return res.status(400).json({ message: "User Not found !!!" });
        }
        req.user = user;
        next();

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};


export const checkPermission = (req, res, next) => {
    try {
        const userRole = req.user.role;

        if (!userRole) {
            return res.status(400).json({ message: "User not found" });
        }

        const permissions = userRole === Role.ADMIN ? RolePermission.ADMIN : RolePermission.USER;

        if (!permissions.includes(req.body.action)) {
            return res.status(403).json({ error: "Permission Not Allowed!!" });
        }

        next();
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }

};


export const isUserExist = async(req, res, next) => {
    try {
        const { userId } = req.body;
        if (!userId || userId.trim().length === 0) {
            return res.status(400).json({ message: "User not found" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User Not found !!!" });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }


}
