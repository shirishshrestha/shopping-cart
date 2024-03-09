import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../Pages/Products/Products";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "../Pages/Cart/Cart";

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
        element: <Products />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
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
