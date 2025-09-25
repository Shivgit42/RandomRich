/* eslint-disable no-empty */
import { useEffect, useMemo, useState, type ReactNode } from "react";
import api, { setAccessToken } from "../api/axios";
import type { AuthUser } from "../types";
import { Ctx } from "./Ctx";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined);

  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setUser(null);
          return;
        }
        setAccessToken(token);
        const { data } = await api.get("/api/v1/user/me");
        setUser(data.user as AuthUser);
      } catch {
        setAccessToken(null);
        setUser(null);
      }
    };
    init();
  }, []);

  const signin = async (email: string, password: string) => {
    const { data } = await api.post("/api/v1/user/signin", { email, password });
    setAccessToken(data.accessToken);
    setUser(data.user as AuthUser);
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    await api.post("/api/v1/user/signup", {
      firstName,
      lastName,
      email,
      password,
    });
    await signin(email, password);
  };

  const signout = async () => {
    try {
      await api.post("/api/v1/user/logout");
    } catch {}
    setAccessToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, signin, signup, signout }), [user]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
