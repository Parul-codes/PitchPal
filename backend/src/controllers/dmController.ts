import { Request, Response } from "express";
import Profile from "../models/Profile";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const generateDM = async (req: Request, res: Response) => {
  try {
    const { brandName, tone } = req.body;

    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    const prompt = `
You are an influencer writing a DM to a brand for collaboration.

Profile:
Name: ${profile.name}
Niche: ${profile.niche}
instaHandle: ${profile.instagram}
tiktokHandle: ${profile.tiktok}
Followers: Instagram - ${profile.followers.instagram}, TikTok - ${profile.followers.tiktok}
Bio: ${profile.bio}

Now write a short ${tone} message to the brand "${brandName}" requesting a potential collaboration.
`;

    // Generate content
    const response: any = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ text: prompt }],
    });

    console.log("Full Gemini Response:", JSON.stringify(response, null, 2));

    // Extract text safely
    const dmText =
  response?.candidates?.[0]?.content?.parts?.[0]?.text ||
  "No DM generated. Try again!";

    res.status(200).json({ dm: dmText });
  } catch (error) {
    console.error("Error generating DM:", error);
    res.status(500).json({ message: "Error generating DM", error });
  }
};
