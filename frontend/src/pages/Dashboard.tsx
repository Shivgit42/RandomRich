import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import BalanceCard from "../components/BalanceCard";
import UserSearch from "../components/UserSearch";
import TransferDialog from "../components/TransferDialog";
import { useAuth } from "../hooks/useAuth";
import api from "../api/axios";
import type { User } from "../types";
import { motion } from "framer-motion";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState("0");
  const [toUser, setToUser] = useState<User | null>(null);

  const loadBalance = async () => {
    try {
      const { data } = await api.get("/api/v1/account/balance");
      setBalance(String(data.balance ?? "0"));
    } catch (err) {
      console.error("Failed to load balance:", err);
    }
  };

  useEffect(() => {
    loadBalance();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <AppBar />

      <main className="mx-auto max-w-7xl px-3 sm:px-4 md:px-8 py-6 sm:py-8 md:py-10">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
            Hi {user?.firstName}! 👋
          </h2>
          <p className="text-slate-500 mt-1 text-base sm:text-lg">
            Manage your money with ease & send instantly.
          </p>
        </motion.div>

        {/* Balance + Search */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3 items-start">
          {/* Balance card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="md:col-span-1"
          >
            <BalanceCard amount={balance} onRefresh={loadBalance} />
          </motion.div>

          {/* User search */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="md:col-span-2"
          >
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">
                Send Money
              </h3>
              <UserSearch onSelect={(u) => setToUser(u)} />
            </div>
          </motion.div>
        </div>

        {/* Transfer dialog */}
        {toUser && (
          <TransferDialog
            toUserId={toUser.id}
            toUserName={`${toUser.firstName} ${toUser.lastName}`}
            onClose={() => setToUser(null)}
            onSuccess={loadBalance}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
