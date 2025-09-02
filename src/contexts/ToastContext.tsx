import type { ReactNode } from "react";
import React, { createContext, useState } from "react";
import Toast from "../components/ui/Toast";

interface ToastData {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export interface ToastContextType {
  showToast: (message: string, type: "success" | "error" | "info") => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    const id = Date.now().toString();
    const newToast: ToastData = { id, message, type };

    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-0 right-0 z-50 space-y-2 p-4">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            isVisible={true}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
