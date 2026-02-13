import express from "express";
import { auth } from "../../MiddleWare/Auth.js";
import { viewAllUsers } from "../../Controller/AdminController.js"

const adminRouter = express.Router();

adminRouter.get("/all-users", auth, viewAllUsers);

export default adminRouter;