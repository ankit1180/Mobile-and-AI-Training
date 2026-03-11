import express from "express";
import { userLogin, UserRegister } from "../../Controller/UserController.js";
import { createBlog, viewOwnBlogs, deleteBlog, editBlog, getUsersWithBlogs } from "../../Controller/BlogController.js";
import { viewAllBlogs } from "../../Controller/AdminController.js";
import { auth } from "../../MiddleWare/Auth.js";
import { isUserExistForBlog, checkPermission, isUserExist } from "../../MiddleWare/ValidateUser.js"
import { isBlogExist, doesUserHasPermission } from "../../MiddleWare/ValidateBlog.js"

const userRouter = express.Router();

// unauthorised routes
userRouter.post("/register", UserRegister);
userRouter.post("/login", userLogin);

// authenticated routes
userRouter.post("/create-blog", auth, isUserExistForBlog, checkPermission, createBlog);
userRouter.get("/blogs/:id", auth, viewOwnBlogs);
userRouter.delete("/delete-blog", auth, isUserExist, isBlogExist, doesUserHasPermission, deleteBlog);
userRouter.put("/edit-blog", auth, isUserExist, isBlogExist, doesUserHasPermission, editBlog);
userRouter.get("/all-blogs", auth, viewAllBlogs);
userRouter.get("/all-users-blogs", auth, getUsersWithBlogs);

export default userRouter;
