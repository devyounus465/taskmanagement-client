import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </QueryClientProvider>
    </DndProvider>
  </React.StrictMode>
);
