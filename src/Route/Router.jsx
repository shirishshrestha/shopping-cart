import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../Pages/Products/Products";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
