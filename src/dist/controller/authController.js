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
exports.deleteOneUser = exports.updateOneUser = exports.readOneUser = exports.readUsers = exports.signinUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authModel_1 = __importDefault(require("../model/authModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userName, email, password, avatar } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const { public_id, secure_url } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const user = yield authModel_1.default.create({ userName: req.body.userName, email: req.body.email, password: hash, avatar: secure_url, avatarID: public_id });
        res.status(201).json({ message: "user created", data: user });
    }
    catch (error) {
        res.status(404).json({ message: "Error Creating User" });
    }
});
exports.createUser = createUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const getUser = yield authModel_1.default.findOne({ email });
        const hash = yield bcrypt_1.default.compare(password, getUser === null || getUser === void 0 ? void 0 : getUser.password);
        if (getUser) {
            if (hash) {
                res.status(201).json({ message: `Welcome back ${getUser.userName}`, data: getUser._id });
            }
            else {
                res.status(404).json({ message: "Password is incorrect" });
            }
        }
        else {
            res.status(404).json({ message: "User cannot be found" });
        }
    }
    catch (error) {
        res.status(404).json({ message: "Error creating User" });
    }
});
exports.signinUser = signinUser;
const readUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authModel_1.default.find();
        res.status(200).json({ message: "reading users", data: user });
    }
    catch (error) {
        res.status(404).json({ message: "Error Reading Users" });
    }
});
exports.readUsers = readUsers;
const readOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield authModel_1.default.findById(id);
        res.status(200).json({ message: "reading one user", data: user });
    }
    catch (error) {
        res.status(404).json({ message: "Error Reading one Users" });
    }
});
exports.readOneUser = readOneUser;
const updateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userName, avatar } = req.body;
        const user = yield authModel_1.default.findByIdAndUpdate(id, { userName, avatar }, { new: true });
        res.status(201).json({ message: "updating one user", data: user });
    }
    catch (error) {
        res.status(404).json({ message: "Error Updating one user" });
    }
});
exports.updateOneUser = updateOneUser;
const deleteOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield authModel_1.default.findByIdAndDelete(id);
        res.status(201).json({ message: "deleting one user", data: user });
    }
    catch (error) {
        res.status(404).json({ message: "Error deleting one User" });
    }
});
exports.deleteOneUser = deleteOneUser;
