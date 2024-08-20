import "express-async-errors";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

import connectDB from "./services/connect.js";

import routes from "./routes/index.js";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());

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
