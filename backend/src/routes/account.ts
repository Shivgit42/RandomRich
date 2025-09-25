import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware";
import {
  getBalance,
  getTransactions,
  transferMoney,
} from "../controllers/accountController";

export const accountRouter = Router();

accountRouter.get("/balance", userMiddleware, getBalance);
accountRouter.post("/transfer", userMiddleware, transferMoney);
accountRouter.get("/transactions", userMiddleware, getTransactions);
