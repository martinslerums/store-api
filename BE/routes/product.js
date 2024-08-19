import express from "express";
import { getAllProducts, getAllProductsStatic } from "../controllers/products.js";

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts);
productRouter.route("/static").get(getAllProductsStatic);

export default productRouter;
