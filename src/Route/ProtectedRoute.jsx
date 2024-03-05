import { Navigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../Utils/StorageUtils/StorageUtils";

const token = getTokenFromLocalStorage();
const ProtectedRoute = ({ children }) => {
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
