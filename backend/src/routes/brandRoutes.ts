import express from "express";
import { getBrandResearch } from "../controllers/brandController";
import { saveBrand } from "../controllers/saveBrandController";

const router = express.Router();
router.post("/brand-research", getBrandResearch);
router.post("/save-brand", saveBrand);

export default router;
