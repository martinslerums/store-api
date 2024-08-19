import express from "express";
import login from "../controllers/login.js";
import register from "../controllers/register.js";

const authRouter = express.Router();

authRouter.route("/login").post(login);
authRouter.route("/register").post(register);

export default authRouter;
