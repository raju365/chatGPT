import { createContext, useContext } from "react";
import useNetworkStatus from "../hooks/useNetworkStatus";

const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const isOnline = useNetworkStatus();

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);

  if (!context) {
    throw new Error(
      "useNetwork must be used within NetworkProvider",
    );
  }

  return context;
};