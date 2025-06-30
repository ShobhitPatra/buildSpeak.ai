"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSchema = exports.templateSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.templateSchema = zod_1.default.object({
    prompt: zod_1.default.string(),
});
exports.chatSchema = zod_1.default.object({
    userPrompt: zod_1.default.string(),
    basePrompt: zod_1.default.string(),
});
