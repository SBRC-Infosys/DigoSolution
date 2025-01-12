import React, { createContext, useContext } from "react";
import { Toaster, toast } from "sonner";

// Define a context without using a custom toast creator
const ToastContext = createContext<typeof toast | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastContext.Provider value={toast}>
      <Toaster position="top-right" richColors />
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast directly
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
