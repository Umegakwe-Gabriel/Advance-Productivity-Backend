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
exports.deleteTask = exports.readTask = exports.createTask = void 0;
const taskModel_1 = __importDefault(require("../model/taskModel"));
const authModel_1 = __importDefault(require("../model/authModel"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { task, priority } = req.body;
        const user = yield authModel_1.default.findById(id);
        const tasked = yield taskModel_1.default.create({
            name: user === null || user === void 0 ? void 0 : user.userName,
            task,
            priority,
            avatar: user === null || user === void 0 ? void 0 : user.avatar
        });
        res.status(201).json({ message: "task created", data: tasked });
    }
    catch (error) {
        res.status(404).json({ message: "Error creating task" });
    }
});
exports.createTask = createTask;
const readTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasked = yield taskModel_1.default.find();
        res.status(200).json({ message: "task read", data: tasked });
    }
    catch (error) {
        res.status(404).json({ message: "Error reading task" });
    }
});
exports.readTask = readTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tasked = yield taskModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted", data: tasked });
    }
    catch (error) {
        res.status(404).json({ message: "Error deleting Task" });
    }
});
exports.deleteTask = deleteTask;
