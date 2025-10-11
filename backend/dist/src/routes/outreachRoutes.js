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
const express_1 = require("express");
const outreachRecords_1 = __importDefault(require("../models/outreachRecords"));
const router = (0, express_1.Router)();
// Get all records
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield outreachRecords_1.default.find().sort({ dmSentDate: -1 });
        res.json(records);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
}));
// Add new record
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRecord = new outreachRecords_1.default(req.body);
        const saved = yield newRecord.save();
        res.status(201).json(saved);
    }
    catch (err) {
        res.status(400).json({ message: 'Error saving record', error: err });
    }
}));
// Update record
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield outreachRecords_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ message: 'Error updating record', error: err });
    }
}));
// Delete record
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield outreachRecords_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Record deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting record', error: err });
    }
}));
exports.default = router;
