import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/tailwind.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Route/Router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./Utils/Query/Query";
import { ShoppingProvider } from "./Utils/Context/ShoppingContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShoppingProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ShoppingProvider>
  </React.StrictMode>
);
