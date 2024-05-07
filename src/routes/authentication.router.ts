import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import { generateToken } from "../helpers/authentication.helper.js";
const authenticationRouter = express.Router();
authenticationRouter.use(express.json());

authenticationRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await collections.ccc_users.findOne({ username, password });
    if (!user) {
      return res.status(401).json({
        username,
        authorized: false,
      });
    }
    const token = generateToken(user.id, username);
    return res.json({
      username,
      token,
      authorized: true,
    });
  } catch (error) {
    return res.status(500).json({ authorized: false });
  }
});

authenticationRouter.post("/register", async (req: Request, res: Response) => {
  try {
    if (req.body.length === 0) {
      return res.json({ error: "No payload provided" });
    }

    const { username, password } = req.body;
    const data = await collections.ccc_users.insertOne({
      username,
      password,
      rol: "Operator",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.json({
      status: "success",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      error,
    });
  }
});
export default authenticationRouter;
