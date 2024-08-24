// Chair Schema
const chairSchema = new Schema({
  name: { type: String, required: [true, "Product name must be provided"] },
  price: { type: Number, required: [true, "Product price must be provided"] },
  featured: { type: Boolean, default: false },
  description: { type: String },
  type: {
    type: String,
    enum: ["office chair", "dining chair", "lounge chair"],
    required: true,
  },
  material: { type: String, required: true }, // Example: material of chair
  dimensions: {
    width: Number,
    height: Number,
    depth: Number,
  },
  rating: { type: Number, default: 4.5, min: 1, max: 5 },
  company: {
    type: String,
    enum: ["ikea", "liddy", "caressa", "marcos"],
  },
  image: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now() },
});

const Chair = mongoose.models.Chair || mongoose.model("Chair", chairSchema);
export default Chair;
