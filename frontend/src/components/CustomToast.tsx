import { Toaster } from "react-hot-toast";

export const CustomToast = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "0.95rem",
          fontWeight: 500,
          borderRadius: "0.75rem",
          padding: "12px 18px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
        },
        success: {
          style: {
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            color: "white",
            border: "1px solid #16a34a",
          },
          iconTheme: {
            primary: "white",
            secondary: "#22c55e",
          },
          duration: 5000,
        },
        error: {
          style: {
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            color: "white",
            border: "1px solid #dc2626",
          },
          iconTheme: {
            primary: "white",
            secondary: "#ef4444",
          },
          duration: 5000,
        },
      }}
    />
  );
};
