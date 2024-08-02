import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "Product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: false
  },
  type: {
    type: String,
    enum: {
      values: ["chair", "table", "sofa"],
      message:
        "{VALUE} is not a valid product type. Allowed types are chair, table, or sofa.",
    },
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating must be at most 5"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message:
        "{VALUE} is not a valid company. Allowed companies are ikea, liddy, caressa, or marcos.",
    },
  },
  image: {
    type: String,
    unique: true,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
