import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  email: string;
  bio: string;
  instagram?: string;
  tiktok?: string;
  followers: {
    instagram: number;
    tiktok: number;
  };
  niche?: string;
  location?: string;
  rates: {
    post: number;
    story: number;
    reel: number;
  };
  mediaKit?: string;
}

const profileSchema = new Schema<IProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String },
    instagram: { type: String },
    tiktok: { type: String },
    followers: {
      instagram: { type: Number, default: 0 },
      tiktok: { type: Number, default: 0 },
    },
    niche: { type: String },
    location: { type: String },
    rates: {
      post: { type: Number, default: 0 },
      story: { type: Number, default: 0 },
      reel: { type: Number, default: 0 },
    },
    mediaKit: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>("Profile", profileSchema);
