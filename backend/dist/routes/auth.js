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
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
// JWT generator
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
// Signup
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const userExists = yield User_1.default.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "User already exists" });
        const user = yield User_1.default.create({ name, email, password });
        const token = generateToken(user._id.toString());
        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}));
// Login
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = yield user.matchPassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        const token = generateToken(user._id.toString());
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}));
exports.default = router;
