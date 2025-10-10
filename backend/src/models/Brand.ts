import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: String,
  niche: String,
  website: String,
  instagram: String,
  description: String,
  suggestedProducts: [String],
});

export default mongoose.model("Brand", brandSchema);
