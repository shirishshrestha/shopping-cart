import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../Pages/Products/Products";
import HomePage from "../Pages/HomePage/HomePage";

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
    ],
  },
]);
