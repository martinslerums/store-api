import express from "express";
import { getAllProducts, getAllProductsStatic, getWishlistProducts, getAllSofas, getAllChairs } from "../controllers/products.js";

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts);

productRouter.route("/sofas").get(getAllSofas);
productRouter.route("/chairs").get(getAllChairs);

productRouter.route("/wishlist").post(getWishlistProducts);



//Testing Purposes
productRouter.route("/static").get(getAllProductsStatic);

export default productRouter;
