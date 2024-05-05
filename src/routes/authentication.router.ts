import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import { generateToken } from "../helpers/authentication.helper.js";
const authenticationRouter = express.Router();
authenticationRouter.use(express.json());

authenticationRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await collections.ccc_users.findOne({ username, password });
    console.log(user);
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

export default authenticationRouter;
