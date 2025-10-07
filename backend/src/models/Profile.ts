import mongoose, { Schema, Document } from "mongoose";

// TypeScript interface
export interface IProfile extends Document {
  name: string;
  email: string;
  instagram: string;
  tiktok?: string;
  followers?: {
    instagram?: number;
    tiktok?: number;
  };
  niche: string;
  location?: string;
  bio?: string;
  rates?: {
    post?: number;
    story?: number;
    reel?: number;
  };
  mediaKit?: string;
}

// Mongoose Schema
const ProfileSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  instagram: { type: String },
  tiktok: { type: String },
  followers: {
    instagram: { type: Number, default: 0 },
    tiktok: { type: Number, default: 0 },
  },
  niche: { type: String, required: true },
  location: { type: String },
  bio: { type: String },
  rates: {
    post: { type: Number, default: 0 },
    story: { type: Number, default: 0 },
    reel: { type: Number, default: 0 },
  },
  mediaKit: { 
    type: String,
    match: /^(http|https):\/\/[^ "]+$/ 
  },
}, { timestamps: true });

// Export model
export default mongoose.model<IProfile>("Profile", ProfileSchema);
