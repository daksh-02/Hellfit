import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin : "https://hellfit.vercel.app",
  // origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";

app.use("/api/v1/users", userRouter);

import exerciseRouter from "./routes/training.route.js";

app.use("/api/v1/training", exerciseRouter);

export { app };
