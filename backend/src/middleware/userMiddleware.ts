import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({
      message: "Missing token",
    });
  }

  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Malformed Authorization header" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_SECRET as string
    ) as JwtPayload;

    req.userId = decoded.id as number;
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
}
