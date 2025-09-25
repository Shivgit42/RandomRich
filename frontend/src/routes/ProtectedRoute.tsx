import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "@/components/ui/Loader";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user === undefined) return <Loader />;
  if (user === null) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
