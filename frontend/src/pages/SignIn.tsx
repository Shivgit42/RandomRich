/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const SignIn: React.FC = () => {
  const nav = useNavigate();
  const { signin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signin(email, password);
      toast.success("You have successfully signed in!");
      nav("/dashboard");
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Signin failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="w-full max-w-md space-y-6 p-6">
        <h1 className="text-center text-3xl font-extrabold tracking-tight">
          Welcome back
        </h1>
        <form className="card space-y-4" onSubmit={submit}>
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <div>
            <label className="label">Email</label>
            <input
              className="input mt-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              className="input mt-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="btn btn-primary w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="text-center text-sm text-slate-600">
          No account?{" "}
          <Link className="link" to="/signup">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
