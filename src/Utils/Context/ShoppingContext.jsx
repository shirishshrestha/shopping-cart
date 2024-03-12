import { createContext, useContext, useState } from "react";
import { getTokenFromLocalStorage } from "../StorageUtils/StorageUtils";

/**
 * Context for managing shopping-related state.
 * @type {React.Context<ShoppingContextValue>}
 */
const ShoppingContext = createContext();

/**
 * Custom hook to access the ShoppingContext.
 * @returns The context value.
 */
export const useShoppingContext = () => {
  return useContext(ShoppingContext);
};

// Get token from local storage
const token = getTokenFromLocalStorage();

/**
 * Provides the ShoppingContext to its children components.
 * @component
 * @param {Object} props - React component props.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the context provider.
 * @returns {React.ReactNode} The wrapped child components with the ShoppingContext.
 */
export const ShoppingProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [totalData, setTotalData] = useState();

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    setTotalData,
    totalData,
  };

  return (
    <ShoppingContext.Provider value={contextValue}>
      {children}
    </ShoppingContext.Provider>
  );
};
