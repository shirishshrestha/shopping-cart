import { Navigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../Utils/StorageUtils/StorageUtils";
import { useShoppingContext } from "../Utils/Context/ShoppingContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useShoppingContext();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
