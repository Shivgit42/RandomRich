import React, { useState, useEffect } from "react";
import { RefreshCw, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface BalanceCardProps {
  amount: string;
  onRefresh?: () => Promise<void> | void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ amount, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [prevAmount, setPrevAmount] = useState(amount);

  const handleRefresh = async () => {
    if (!onRefresh) return;
    setLoading(true);
    try {
      await onRefresh();
    } finally {
      setLoading(false);
    }
  };

  // Detect balance change
  useEffect(() => {
    if (prevAmount !== amount) {
      setHighlight(true);
      setTimeout(() => setHighlight(false), 800); // highlight duration
      setPrevAmount(amount);
    }
  }, [amount, prevAmount]);

  return (
    <div className="bg-gradient-to-tr from-brand-600 to-indigo-600 text-white rounded-2xl shadow-lg p-6 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-medium opacity-80">Current Balance</h3>

        {loading ? (
          <div className="mt-4 flex items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-white/80" />
            <span className="text-lg font-medium opacity-80">Refreshing…</span>
          </div>
        ) : (
          <motion.p
            className="text-3xl font-bold mt-2"
            animate={{
              scale: highlight ? 1.2 : 1,
              color: highlight ? "#00FF00" : "#FFFFFF",
            }}
            transition={{ duration: 0.3 }}
          >
            ₹ {amount}
          </motion.p>
        )}
      </div>

      <button
        onClick={handleRefresh}
        disabled={loading}
        className="self-end mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-2 text-sm text-white/80 hover:text-white transition disabled:opacity-50 cursor-pointer"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        Refresh
      </button>
    </div>
  );
};

export default BalanceCard;
