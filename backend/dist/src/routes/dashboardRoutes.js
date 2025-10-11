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
const outreachRecords_1 = __importDefault(require("../models/outreachRecords"));
const Form_1 = __importDefault(require("../models/Form"));
const router = express_1.default.Router();
// GET /api/dashboard
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalBrandsPitched = yield outreachRecords_1.default.countDocuments();
        const dmsSent = yield outreachRecords_1.default.countDocuments({ status: "Sent" });
        const responsesReceived = yield outreachRecords_1.default.countDocuments({ status: "Replied" });
        const followUpsPending = yield outreachRecords_1.default.countDocuments({ status: "Following Up" });
        const formsFilled = yield Form_1.default.countDocuments();
        const acceptanceRate = totalBrandsPitched > 0
            ? Math.round((responsesReceived / totalBrandsPitched) * 100)
            : 0;
        res.status(200).json({
            totalBrandsPitched,
            dmsSent,
            formsFilled,
            followUpsPending,
            responsesReceived,
            acceptanceRate,
        });
    }
    catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({ message: "Error fetching dashboard stats", error });
    }
}));
exports.default = router;
