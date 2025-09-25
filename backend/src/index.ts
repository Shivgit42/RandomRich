import express from "express";
import { prisma } from "./db";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user";
import { accountRouter } from "./routes/account";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

const port = process.env.PORT || 3000;
const startServer = async () => {
  await prisma.$connect().then(() => {
    console.log("Prisma is connected to Postgres DB");
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
