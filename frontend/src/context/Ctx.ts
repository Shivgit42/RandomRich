import { createContext } from "react";
import type { AuthUser } from "../types";

interface AuthCtx {
  user: AuthUser | null | undefined;
  signin: (email: string, password: string) => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  signout: () => Promise<void>;
}

export const Ctx = createContext<AuthCtx | null>(null);
