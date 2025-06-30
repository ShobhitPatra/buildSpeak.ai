"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const template_controller_1 = require("./controllers/template.controller");
const chat_controller_1 = require("./controllers/chat.controller");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../../.env"),
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/template", template_controller_1.templateController);
app.post("/chat", chat_controller_1.chatController);
app.listen(process.env.PORT || 8000, () => {
    console.log(`server running on PORT ${process.env.PORT}`);
});
