import React, {
  createContext,
  useContext,
  useState,
} from "react";

interface AlertContextType {
  alert: { title: string; description: string; type: string; onConfirm: () => void } | null;
  showAlert: (alertData: {
    title: string;
    description: string;
    type: string;
    onConfirm: () => void;
  }) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<AlertContextType["alert"]>(null);

  const showAlert = (alertData: AlertContextType["alert"]) =>
    setAlert(alertData);
  const hideAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
