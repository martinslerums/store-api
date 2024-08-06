import "express-async-errors";

import dotenv from "dotenv";
import cors from "cors";
import express from "express";

import connectDB from "./services/connect.js";

import routes from "./routes/products.js";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1> STORE API </h1><a href="/api/products">products route</a>');
});

app.use("/api", routes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.log("Failed to connect to the database:", error.message);
  }
};

start();
