import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import WishListPage from "./pages/WishListPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/wishlist",
        element: <WishListPage />,
      },
    ],
  },
]);

export default router;
