import express from "express";
import { getAllProducts, getAllProductsStatic } from "../controllers/products.js";
import login from "../controllers/login.js";
import register from "../controllers/register.js";


const routes = express.Router();

/*Products*/
routes.route("/products").get(getAllProducts);
routes.route("/static").get(getAllProductsStatic);

/*Account*/
routes.route("/login").get(login);
routes.route("/register").post(register);



export default routes;
