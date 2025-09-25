import { useContext } from "react";
import { Ctx } from "../context/Ctx";

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
