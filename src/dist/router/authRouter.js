"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const router = express_1.default.Router();
router.route("/all-users").get(authController_1.readUsers);
router.route("/:id/get-one-user").get(authController_1.readOneUser);
router.route("/:id/update-users").patch(authController_1.updateOneUser);
router.route("/:id/delete-users").delete(authController_1.deleteOneUser);
router.route("/register").post(authController_1.createUser);
router.route("/sign-in").post(authController_1.signinUser);
exports.default = router;
