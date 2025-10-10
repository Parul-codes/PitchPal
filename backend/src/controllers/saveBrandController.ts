import { Request, Response } from "express";
import Brand from "../models/Brand";

export const saveBrand = async (req: Request, res: Response) => {
  try {
    const { name, niche, website, instagram, description, suggestedProducts } = req.body;
    const brand = new Brand({
      name,
      niche,
      website,
      instagram,
      description,
      suggestedProducts,
    });
    await brand.save();
    res.status(201).json({ message: "Brand saved successfully" });
  } catch (error) {
    console.error("Error saving brand:", error);
    res.status(500).json({ message: "Error saving brand", error });
  }
};
