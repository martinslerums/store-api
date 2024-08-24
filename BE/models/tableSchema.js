// Table Schema
const tableSchema = new Schema({
  name: { type: String, required: [true, "Product name must be provided"] },
  price: { type: Number, required: [true, "Product price must be provided"] },
  featured: { type: Boolean, default: false },
  description: { type: String },
  type: {
    type: String,
    enum: ["dining table", "coffee table", "office table"],
    required: true,
  },
  material: { type: String, required: true }, // Example: material of table
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

const Table = mongoose.models.Table || mongoose.model("Table", tableSchema);
export default Table;

