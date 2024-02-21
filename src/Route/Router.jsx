import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Landing from "../Pages/Landing/Landing";
import Products from "../Pages/Products/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);
