"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const progressController_1 = require("../controller/progressController");
const router = express_1.default.Router();
router.route("/create-progress").post(progressController_1.createProgress);
router.route("/view-progress").get(progressController_1.readProgress);
router.route("/:id/view-progress-info").get(progressController_1.readProgressDetail);
router.route("/:id/delete-progress").delete(progressController_1.deleteProgress);
exports.default = router;
