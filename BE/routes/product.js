import express from "express";
import { getAllProducts, getAllProductsStatic, getWishlistProducts, getFilteredProducts, getFilters } from "../controllers/products.js";

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts);

productRouter.route("/sofas").get(getFilteredProducts);
productRouter.route("/sofas/filters").get(getFilters);

productRouter.route("/chairs").get(getFilteredProducts);
productRouter.route("/chairs/filters").get(getFilters); 

productRouter.route("/wishlist").post(getWishlistProducts);
productRouter.route("/cart").post(getWishlistProducts); // Can use same controller for now since it does one thing - fines products based on ids provided within an array




//Testing Purposes
productRouter.route("/static").get(getAllProductsStatic);

export default productRouter;
