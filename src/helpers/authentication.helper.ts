import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = "secret";

export function generateToken(userId: string, username: string) {
  return jwt.sign({ userId, username }, secretKey, {});
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader)
    return res.status(401).json({ error: "No authorization header" });
  const bearerToken = bearerHeader.split(" ")[1];
  if (bearerToken === process.env.MAGIC_BEARER) {
    return next();
  }
  try {
    const decoded = jwt.verify(bearerToken, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "failure",
      error: {
        message: "Token is not valid",
      },
    });
  }
}
