import mongoose, { Schema, Document } from "mongoose";

interface IProfile extends Document {
  name: string;
  niche: string;
  bio: string;
  location?: string;
  mediaKit?: string;
  followers: {
    instagram: number;
    tiktok: number;
  };
  instagram?: string; 
  tiktok?: string;
}

const ProfileSchema: Schema = new Schema({
  name: { type: String, required: true },
  niche: { type: String, required: true },
  bio: { type: String },
  location: { type: String },
  mediaKit: { type: String },
  followers: {
    instagram: { type: Number, default: 0 },
    tiktok: { type: Number, default: 0 },
  },
  instagram: { type: String }, 
  tiktok: { type: String },
});

export default mongoose.model<IProfile>("Profile", ProfileSchema);
