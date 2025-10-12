"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrandResearch = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const genai_1 = require("@google/genai");
dotenv_1.default.config();
const client = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const getBrandResearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
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
        const response = yield client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ text: prompt }],
        });
        const rawText = ((_e = (_d = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) ||
            ((_g = (_f = response === null || response === void 0 ? void 0 : response.candidates) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.output_text) ||
            "";
        // Try parsing JSON safely
        let brands = [];
        try {
            brands = JSON.parse(rawText);
        }
        catch (_h) {
            // Fallback: extract JSON-like content
            const jsonMatch = rawText.match(/\[([\s\S]*)\]/);
            if (jsonMatch)
                brands = JSON.parse(jsonMatch[0]);
        }
        if (!brands.length) {
            return res.status(200).json({ brands: [], message: "No structured data found." });
        }
        res.status(200).json({ brands });
    }
    catch (error) {
        console.error("Error in getBrandResearch:", error);
        res.status(500).json({ message: "Error fetching brand data", error });
    }
});
exports.getBrandResearch = getBrandResearch;
