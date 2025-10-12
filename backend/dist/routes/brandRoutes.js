"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brandController_1 = require("../controllers/brandController");
const saveBrandController_1 = require("../controllers/saveBrandController");
const router = express_1.default.Router();
router.post("/brand-research", brandController_1.getBrandResearch);
router.post("/save-brand", saveBrandController_1.saveBrand);
exports.default = router;
