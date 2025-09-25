/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import AppBar from "../components/AppBar";
import api from "../api/axios";
import type { Transaction } from "../types";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "@/components/ui/Loader";

const Badge: React.FC<{ kind: "SUCCESS" | "FAILED" | "PENDING" }> = ({
  kind,
}) => {
  const styles = {
    SUCCESS: "bg-green-100 text-green-700",
    FAILED: "bg-red-100 text-red-700",
    PENDING: "bg-amber-100 text-amber-700",
  } as const;
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs ${styles[kind]}`}>
      {kind}
    </span>
  );
};

const Transactions: React.FC = () => {
  const { user } = useAuth();
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/api/v1/account/transactions");
        setTxs(data.transactions ?? data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const rows = useMemo(
    () =>
      txs.map((tx) => {
        const isOut = tx.senderId === user?.id;
        const other = isOut ? tx.receiver : tx.sender;
        const name = other
          ? `${other.firstName} ${other.lastName}`
          : isOut
          ? "Recipient"
          : "Sender";
        return {
          id: tx.id,
          when: new Date(tx.createdAt).toLocaleString("en-IN"),
          direction: isOut ? "Sent" : "Received",
          name,
          email: other?.email ?? "",
          amount: `${isOut ? "-" : "+"}₹${Number(tx.amount).toLocaleString(
            "en-IN"
          )}`,
          status: tx.status,
        };
      }),
    [txs, user?.id]
  );

  return (
    <>
      <AppBar />
      <main className="mx-auto max-w-6xl p-4 md:p-6">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">Transactions</h2>
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-slate-500">
                <th className="pb-3">Date</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">User</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loader />
              ) : rows.length === 0 ? (
                <tr>
                  <td className="py-6 text-center text-slate-500" colSpan={5}>
                    No transactions yet.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t border-slate-100 text-sm">
                    <td className="py-3">{r.when}</td>
                    <td className="py-3">{r.direction}</td>
                    <td className="py-3">
                      <div className="font-medium">{r.name}</div>
                      <div className="text-xs text-slate-500">{r.email}</div>
                    </td>
                    <td
                      className={`py-3 font-semibold ${
                        r.amount.startsWith("-")
                          ? "text-red-600"
                          : "text-green-700"
                      }`}
                    >
                      {r.amount}
                    </td>
                    <td className="py-3">
                      <Badge kind={r.status as any} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Transactions;
