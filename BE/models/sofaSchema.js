import mongoose from "mongoose";
const { Schema } = mongoose;

const sofaSchema = new Schema(
  {
    name: { type: String, required: [true, "Product name must be provided"] },
    price: { type: Number, required: [true, "Product price must be provided"] },
    featured: { type: Boolean, default: false },
    description: { type: String },
    type: { type: String, enum: ["bed", "sofa", "corner-sofa"], required: true },
    material: {
      type: String,
      enum: ["leather", "polyester", "velvet", "fabric"],
      required: true,
    },
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
    },
    color: { type: String },
    seat_size: { type: Number },
    rating: { type: Number, default: 4.5, min: 1, max: 5 },
    company: {
      type: String,
      enum: ["ikea", "mebeles1", "caressa", "marcos"],
    },
    image: { type: String, unique: true },
  },
  { timestamps: true }
);

const Sofa = mongoose.models.Sofa || mongoose.model("Sofa", sofaSchema);

export default Sofa;
