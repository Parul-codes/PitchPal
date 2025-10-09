import express from "express";
import { generateDM } from "../controllers/dmController";

const router = express.Router();

router.post("/generate", generateDM);

export default router;
