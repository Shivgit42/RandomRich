import { Router } from "express";
import {
  userSignup,
  userSignin,
  userUpdate,
  refresh,
  logout,
  getUsersBulk,
  currentUser,
} from "../controllers/userController";
import { userMiddleware } from "../middleware/userMiddleware";

export const userRouter = Router();

userRouter.post("/signup", userSignup);
userRouter.post("/signin", userSignin);
userRouter.post("/refresh", refresh);
userRouter.post("/logout", logout);
userRouter.put("/update", userMiddleware, userUpdate);
userRouter.get("/bulk", getUsersBulk);
userRouter.get("/me", userMiddleware, currentUser);
