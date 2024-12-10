import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.tsx";

import HomePage from "./pages/HomePage.tsx";
import CartPage from "./pages/CartPage.tsx";
import SofasPage from "./pages/SofasPage.tsx";
import ChairsPage from "./pages/ChairsPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import WishListPage from "./pages/WishListPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";

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
        path: "/products/sofas",
        element: <SofasPage />,
      },
      {
        path: "/products/chairs",
        element: <ChairsPage />,
      },
      {
        path: "/wishlist",
        element: <WishListPage />,
      }, 
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);

export default router;
