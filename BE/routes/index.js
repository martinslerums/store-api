import express from "express";
import productRouter from "./product.js";
import authRouter from "./auth.js";

const router = express.Router();

router.use("/products", productRouter);
router.use("/auth", authRouter);

export default router;
