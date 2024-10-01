import express from 'express';
import { Login, Logout, register, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const userRouter = express.Router();

userRouter.route('/register').post(register);
userRouter.route('/login').get(Login);
userRouter.route("/profile/update").post(isAuthenticated, updateProfile);
userRouter.route('/logout').get(Logout);

export default userRouter;