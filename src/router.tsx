import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./pages/layout";
import Products from "./pages/products";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/Products" replace />,
      },
      {
        path: "/Products",
        element: <Products />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
