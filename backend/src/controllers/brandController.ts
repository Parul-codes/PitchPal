import { Request, Response } from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const getBrandResearch = async (req: Request, res: Response) => {
  try {
    const { query, niche } = req.body;

    const prompt = `
        You are a JSON generator.

        Return ONLY valid JSON.
        No explanations.
        No markdown.
        No backticks.
        No trailing commas.
        Escape all quotes inside strings.

        The response must be exactly in this format:

        {
          "brands": [
            {
              "id": "1",
              "name": "",
              "niche": "",
              "website": "",
              "instagram": "",
              "popularProducts": [],
              "description": ""
            }
          ]
        }

        Find 3 real brands related to the ${query || niche} niche.
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
    // let brands = [];
    // try {
    //   brands = JSON.parse(rawText);
    // } catch {
    //   // Fallback: extract JSON-like content
    //   const jsonMatch = rawText.match(/\[([\s\S]*)\]/);
    //   if (jsonMatch) brands = JSON.parse(jsonMatch[0]);
    // }

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (e) {
      console.error("Invalid JSON from Gemini:", rawText);
      throw new Error("Gemini returned invalid JSON");
    }

    const brands = parsed?.brands ?? [];

    return res.status(200).json({ brands });


    // if (!brands.length) {
    //   return res.status(200).json({ brands: [], message: "No structured data found." });
    // }

    // res.status(200).json({ brands });
    
  } catch (error) {
    console.error("Error in getBrandResearch:", error);
    res.status(500).json({ message: "Error fetching brand data", error });
  }
};
