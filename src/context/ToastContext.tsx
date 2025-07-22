import React, { createContext, useContext, useState } from "react";

type ToastContextType = {
  showToast: (
    message: string,
    type?: "success" | "error" | "info" | "warning"
  ) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const showToast = (
    msg: string,
    type: "success" | "error" | "warning" | "info" = "info"
  ) => {
    setMessage(msg);
    setToastType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  const toastBgClass = {
    success: "bg-green",
    error: "bg-red",
    info: "bg-blue",
    warning: "bg-yellow",
  }[toastType];

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div
          className={`fixed text-primary bottom-4 right-4 text-white p-3 rounded shadow-md transition-all ${toastBgClass}`}
        >
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
