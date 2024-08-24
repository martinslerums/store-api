// This is function where we take product.json file and populate our data base with product objects

import dotenv from "dotenv";
import connectDB from "./services/connect.js";
import sofaProducts from "./sofas.json" assert { type: "json" };
import Sofa from "./models/sofaSchema.js"

dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB");

    await Sofa.deleteMany();
    await Sofa.create(sofaProducts);

    //This will terminate the process
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

start();
