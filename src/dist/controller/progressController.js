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
exports.deleteProgress = exports.readProgressDetail = exports.readProgress = exports.createProgress = void 0;
const progressModel_1 = __importDefault(require("../model/progressModel"));
const createProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasked = yield progressModel_1.default.create(req.body);
        res.status(201).json({ message: "task created", done: tasked });
    }
    catch (error) {
        res.status(201).json({ message: "task created" });
    }
});
exports.createProgress = createProgress;
const readProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasked = yield progressModel_1.default.find();
        res.status(200).json({ message: "task read", data: tasked });
    }
    catch (error) {
        res.status(404).json({ message: "Error reading task" });
    }
});
exports.readProgress = readProgress;
const readProgressDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tasked = yield progressModel_1.default.findById(id).populate({ path: "step", options: {
                sort: { createdAt: -1 },
            } });
        res.status(200).json({ message: "task read", data: tasked });
    }
    catch (error) {
        res.status(404).json({ message: "error reading task" });
    }
});
exports.readProgressDetail = readProgressDetail;
const deleteProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tasked = yield progressModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "tasked deleted", data: tasked });
    }
    catch (error) {
        res.status(404).json({ message: "tasked deleted" });
    }
});
exports.deleteProgress = deleteProgress;
