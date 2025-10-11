import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  formLink: { type: String },
  dateSubmitted: { type: Date, default: Date.now },
});

export default mongoose.model("Form", FormSchema);
