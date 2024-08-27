import mongoose from "mongoose";
const { Schema } = mongoose;

const chairSchema = new Schema(
  {
    name: { type: String, required: [true, "Product name must be provided"] },
    price: { type: Number, required: [true, "Product price must be provided"] },
    featured: { type: Boolean, default: false },
    description: { type: String },
    type: {
      type: String,
      enum: ["office-chair", "dining-chair", "lounge-chair", "bar-chair"],
      required: true,
    },
    material: {
      type: String,
      enum: ["leather", "fabric", "wood", "metal"],
      required: true, 
    },
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
      seat_height: Number,
    },
    color: { type: String },
    rating: { type: Number, default: 4.5, min: 1, max: 5 },
    company: {
      type: String,
      enum: ["ikea", "mebeles1", "berry", "marcos"],
    },
    image: { type: String, unique: true },
  },
  { timestamps: true }
);

const Chair = mongoose.models.Chair || mongoose.model("Chair", chairSchema);
export default Chair;
