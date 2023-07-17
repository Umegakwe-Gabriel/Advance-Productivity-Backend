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
exports.deleteStep = exports.updateOneStep = exports.readOneStep = exports.readSteps = exports.readTask = exports.createStep = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const authModel_1 = __importDefault(require("../model/authModel"));
const taskModel_1 = __importDefault(require("../model/taskModel"));
const stepModel_1 = __importDefault(require("../model/stepModel"));
const createStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { assignedName, assignedTask, assignedPriority } = req.body;
        const auth = yield authModel_1.default.findOne({ userName: assignedName });
        const task = yield taskModel_1.default.findById(id);
        if (auth) {
            const step = yield stepModel_1.default.create({
                assignedTask, assignedName: auth === null || auth === void 0 ? void 0 : auth.userName,
                assignedAvatar: auth === null || auth === void 0 ? void 0 : auth.avatar,
                assignedPriority,
            });
            task.step.push(new mongoose_1.default.Types.ObjectId(step === null || step === void 0 ? void 0 : step._id));
            task.save();
            res.status(201).json({ message: "task created", data: step });
        }
        else {
            res.status(404).json({ message: "Error assigning user" });
        }
    }
    catch (error) {
        res.status(404).json({ message: "Error Creating Task" });
    }
});
exports.createStep = createStep;
const readTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasked = yield taskModel_1.default.find();
        res.status(200).json({ message: "task read", data: tasked });
    }
    catch (error) {
        res.status(404).json({ message: "Error reading Task" });
    }
});
exports.readTask = readTask;
const readSteps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tasked = yield taskModel_1.default.findById(id).populate({
            path: "step",
            options: {
                sort: { createdAt: -1 }
            },
        });
        res.status(200).json({ message: "task step read", data: tasked });
    }
    catch (error) {
        res.status(404).json({ message: "Error reading task" });
    }
});
exports.readSteps = readSteps;
const readOneStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tasked = yield stepModel_1.default.findById(id);
        res.status(200).json({ message: "task step read", data: tasked });
    }
    catch (error) {
        res.status(404).json({ message: "Error reading task" });
    }
});
exports.readOneStep = readOneStep;
const updateOneStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { assignedTask } = req.body;
        const tasked = yield stepModel_1.default.findByIdAndUpdate(id, { assignedTask }, { new: true });
        res.status(200).json({ message: "task step read", data: tasked });
    }
    catch (error) {
        res.status(404).json({ message: "Error reading task" });
    }
});
exports.updateOneStep = updateOneStep;
const deleteStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stepID, taskID } = req.params;
        const tasked = yield taskModel_1.default.findById(taskID);
        const stepped = yield stepModel_1.default.findByIdAndDelete(stepID);
        tasked.step.pull(new mongoose_1.default.Types.ObjectId(stepped === null || stepped === void 0 ? void 0 : stepped._id));
        tasked.save();
        res.status(200).json({ message: "step deleted" });
    }
    catch (error) {
        res.status(404).json({ message: "Error deleting step" });
    }
});
exports.deleteStep = deleteStep;
