import { Navigate } from "react-router-dom";
import { useShoppingContext } from "../Utils/Context/ShoppingContext";

/**
 * ProtectedRoute component for conditional rendering based on user authentication.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered if the user is authenticated.
 * @returns {JSX.Element} - The JSX element representing the protected route.
 */
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useShoppingContext();

  /**
   * Renders the protected route content or redirects to the login page if the user is not authenticated.
   *
   * @returns {JSX.Element} - The JSX element representing the protected route content or redirection.
   */
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
