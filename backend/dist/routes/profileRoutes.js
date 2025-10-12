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
const express_1 = __importDefault(require("express"));
const Profile_1 = __importDefault(require("../models/Profile"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// 🔒 Get current user's profile
router.get("/", authMiddleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield Profile_1.default.findOne({ user: req.user._id });
        if (!profile)
            return res.status(404).json({ error: "Profile not found" });
        res.json(profile);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// 🔒 Create or update current user's profile
// 🔒 Create or update current user's profile
router.post("/", authMiddleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, bio, instagram, tiktok, followers, niche, location, rates, mediaKit, } = req.body;
        let profile = yield Profile_1.default.findOne({ user: req.user._id });
        if (profile) {
            // Update existing profile
            profile.name = name || profile.name;
            profile.email = email || profile.email;
            profile.bio = bio || profile.bio;
            profile.instagram = instagram || profile.instagram;
            profile.tiktok = tiktok || profile.tiktok;
            profile.followers = followers || profile.followers;
            profile.niche = niche || profile.niche;
            profile.location = location || profile.location;
            profile.rates = rates || profile.rates;
            profile.mediaKit = mediaKit || profile.mediaKit;
            profile = yield profile.save();
            return res.json(profile);
        }
        // Create new profile
        profile = new Profile_1.default({
            user: req.user._id,
            name,
            email,
            bio,
            instagram,
            tiktok,
            followers: followers || { instagram: 0, tiktok: 0 },
            niche,
            location,
            rates: rates || { post: 0, story: 0, reel: 0 },
            mediaKit,
        });
        yield profile.save();
        res.status(201).json(profile);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}));
// 🔒 Delete current user's profile
router.delete("/", authMiddleware_1.protect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield Profile_1.default.findOneAndDelete({ user: req.user._id });
        if (!profile)
            return res.status(404).json({ error: "Profile not found" });
        res.json({ message: "Profile deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;
