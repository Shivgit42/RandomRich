import React, { useState } from "react";
import api from "../api/axios";
import { PaymentSuccessDialog } from "./PaymentSuccessDialog";
import { Spinner } from "./ui/Spinner";

interface Props {
  toUserId: number | null;
  toUserName?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const TransferDialog: React.FC<Props> = ({
  toUserId,
  toUserName,
  onClose,
  onSuccess,
}) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const disabled = !toUserId || !Number(amount);

  const submit = async () => {
    if (disabled) return;
    setLoading(true);
    try {
      await api.post("/api/v1/account/transfer", {
        toUserId,
        amount: Number(amount),
      });
      setSuccessOpen(true);
      onSuccess?.();
    } catch (e) {
      alert("Transfer failed");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Transfer Dialog */}
      <div className="fixed inset-0 z-40 grid place-items-center bg-black/30 p-3 sm:p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-4 sm:p-6 shadow-2xl">
          <div className="mb-4 text-lg font-semibold">
            Send money {toUserName ? `to ${toUserName}` : ""}
          </div>
          <label className="label">Amount (INR)</label>
          <input
            className="input mt-2 w-full border rounded-md px-3 py-2"
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="mt-6 flex justify-end gap-2">
            <button className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary flex items-center justify-center gap-2"
              disabled={disabled || loading}
              onClick={submit}
            >
              {loading ? (
                <>
                  <Spinner />
                  Sending…
                </>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <PaymentSuccessDialog
        open={successOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSuccessOpen(false);
            onClose();
          }
        }}
        receiverName={toUserName ?? "User"}
        amount={Number(amount)}
      />
    </>
  );
};

export default TransferDialog;
