import express from "express";
import { getAllProducts, getAllProductsStatic, getWishlistProducts } from "../controllers/products.js";

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts);
productRouter.route("/wishlist").post(getWishlistProducts);

//Testing Purposes
productRouter.route("/static").get(getAllProductsStatic);

export default productRouter;
