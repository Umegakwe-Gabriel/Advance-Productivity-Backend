"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MainApp_1 = require("./MainApp");
const DBConfig_1 = require("./config/DBConfig");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, MainApp_1.mainApp)(app);
const server = app.listen(process.env.PORT || port, () => {
    // console.log("server is live");
    (0, DBConfig_1.db)();
});
process.on("uncaughtException", (error) => {
    console.log("server is shutting down due to uncaughtException");
    console.log(error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("server is shutting down due to unhandledRejection");
    console.log(reason);
    server.close(() => {
        process.exit(1);
    });
});
