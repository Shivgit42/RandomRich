import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

interface PaymentSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receiverName: string;
  amount: number;
}

export function PaymentSuccessDialog({
  open,

  onOpenChange,
  receiverName,
  amount,
}: PaymentSuccessDialogProps) {
  const timestamp = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-2xl shadow-xl p-6 text-center bg-gradient-to-b from-white to-gray-50">
        <DialogHeader>
          <DialogTitle className="text-lg text-center font-semibold text-gray-800">
            Payment Successful
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <div className="text-xl font-bold text-gray-900">
            ₹ {amount.toLocaleString("en-IN")}
          </div>

          <div className="text-gray-700 text-sm">
            Sent to <span className="font-medium">{receiverName}</span>
          </div>

          <div className="text-xs text-gray-500">{timestamp}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
