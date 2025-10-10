import { Request, Response } from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const getBrandResearch = async (req: Request, res: Response) => {
  try {
    const { query, niche } = req.body;

    const prompt = `
Find 3 real brands related to the ${query || niche} niche. 
For each brand, return:
- name
- niche (category)
- website (if known)
- Instagram handle (if known)
- 3 popular products
- a short 1-sentence brand description

Return a valid JSON array like this:
{
  "brands": [
    {
      "id": "1",
      "name": "Glossier",
      "niche": "beauty",
      "website": "glossier.com",
      "suggestedProducts": ["Lip Balm", "Cloud Paint"]
    }
  ]
}
    `;

    const response: any = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ text: prompt }],
    });

    const rawText =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      response?.candidates?.[0]?.output_text ||
      "";

    // Try parsing JSON safely
    let brands = [];
    try {
      brands = JSON.parse(rawText);
    } catch {
      // Fallback: extract JSON-like content
      const jsonMatch = rawText.match(/\[([\s\S]*)\]/);
      if (jsonMatch) brands = JSON.parse(jsonMatch[0]);
    }

    if (!brands.length) {
      return res.status(200).json({ brands: [], message: "No structured data found." });
    }

    res.status(200).json({ brands });
  } catch (error) {
    console.error("Error in getBrandResearch:", error);
    res.status(500).json({ message: "Error fetching brand data", error });
  }
};
