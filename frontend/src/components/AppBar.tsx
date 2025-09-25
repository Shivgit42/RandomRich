import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { AlignJustify, X } from "lucide-react";

const AppBar: React.FC = () => {
  const { user, signout } = useAuth();
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    loc.pathname === path ? "text-brand-600 font-semibold" : "text-slate-600";

  return (
    <>
      {/* Top AppBar */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 border-b border-slate-200 bg-white/70 backdrop-blur-md"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl text-white grid place-items-center font-bold">
              <img src="/wallet-5.svg" alt="" />
            </div>
            <span className="text-xl font-bold text-slate-800">Wallet</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-4 md:gap-6">
            <Link
              className={`hover:text-brand-600 ${isActive("/dashboard")}`}
              to="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className={`hover:text-brand-600 ${isActive("/transactions")}`}
              to="/transactions"
            >
              Transactions
            </Link>
            {user ? (
              <button
                className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
                onClick={signout}
              >
                Sign out
              </button>
            ) : (
              <div className="flex gap-2">
                <Link
                  className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100"
                  to="/signin"
                >
                  Sign in
                </Link>
                <Link
                  className="px-3 py-1.5 rounded-lg bg-brand-600 text-white  shadow hover:bg-brand-700 transition"
                  to="/signup"
                >
                  Create account
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setOpen(true)}
          >
            <AlignJustify className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-white h-full shadow-xl p-4 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-slate-800">Menu</span>
              <button onClick={() => setOpen(false)}>
                <X className="w-6 h-6 text-slate-700" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              <Link
                className={`hover:text-brand-600 ${isActive("/dashboard")}`}
                to="/dashboard"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                className={`hover:text-brand-600 ${isActive("/transactions")}`}
                to="/transactions"
                onClick={() => setOpen(false)}
              >
                Transactions
              </Link>
              {user ? (
                <button
                  className="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition cursor-pointer text-left"
                  onClick={() => {
                    signout();
                    setOpen(false);
                  }}
                >
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    className="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-100"
                    to="/signin"
                    onClick={() => setOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    className="px-3 py-2 rounded-lg bg-brand-600 text-white shadow hover:bg-brand-700 transition"
                    to="/signup"
                    onClick={() => setOpen(false)}
                  >
                    Create account
                  </Link>
                </>
              )}
            </nav>
          </motion.div>

          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
};

export default AppBar;
