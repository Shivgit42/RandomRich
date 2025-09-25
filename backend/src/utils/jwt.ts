import jwt from "jsonwebtoken";

const ACCESS_TTL = "1h";
const REFRESH_TTL_SEC = 60 * 60 * 24 * 7;

export function signAccessToken(payload: object) {
  return jwt.sign(payload, process.env.ACCESS_SECRET as string, {
    expiresIn: ACCESS_TTL,
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.ACCESS_SECRET as string);
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload, process.env.REFRESH_SECRET as string, {
    expiresIn: REFRESH_TTL_SEC,
  });
}

export const REFRESH_MAX_AGE_MS = REFRESH_TTL_SEC * 1000;
