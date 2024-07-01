import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectToDatabase } from "./services/database.service";
import { verifyToken } from "./helpers/authentication.helper";
import restfulRouter from "./routes/restful.router";
import authenticationRouter from "./routes/authentication.router";

const app: Express = express();
const port = process.env.PORT || 3000;

const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err.stack);
  res.status(500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};

app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

// https://www.mongodb.com/resources/products/compatibilities/using-typescript-with-mongodb-tutorial

connectToDatabase()
  .then(() => {
    app.use("/auth", authenticationRouter);
    app.use("/api", verifyToken, restfulRouter);
    //app.use("/api", restfulRouter);
    app.get("/", (_req: Request, res: Response) => {
      res.send({
        status: {
          message: "Server up && running",
        },
      });
    });
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
