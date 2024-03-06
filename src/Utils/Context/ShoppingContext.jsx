import { createContext, useContext, useState } from "react";
import { getTokenFromLocalStorage } from "../StorageUtils/StorageUtils";

const ShoppingContext = createContext();

export const useShoppingContext = () => {
  return useContext(ShoppingContext);
};

const token = getTokenFromLocalStorage();

export const ShoppingProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <ShoppingContext.Provider value={contextValue}>
      {children}
    </ShoppingContext.Provider>
  );
};
