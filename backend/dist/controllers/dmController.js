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
exports.generateDM = void 0;
const Profile_1 = __importDefault(require("../models/Profile"));
const dotenv_1 = __importDefault(require("dotenv"));
const genai_1 = require("@google/genai");
dotenv_1.default.config();
const client = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const generateDM = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const { brandName, tone } = req.body;
        const profile = yield Profile_1.default.findOne();
        if (!profile)
            return res.status(404).json({ message: "Profile not found" });
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
        const response = yield client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ text: prompt }],
        });
        console.log("Full Gemini Response:", JSON.stringify(response, null, 2));
        // Extract text safely
        const dmText = ((_e = (_d = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) ||
            "No DM generated. Try again!";
        res.status(200).json({ dm: dmText });
    }
    catch (error) {
        console.error("Error generating DM:", error);
        res.status(500).json({ message: "Error generating DM", error });
    }
});
exports.generateDM = generateDM;
