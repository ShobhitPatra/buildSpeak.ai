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
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = void 0;
const prompts_1 = require("../prompts");
const schema_1 = require("../schema");
const chatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { success } = schema_1.chatSchema.safeParse(req.body);
        if (!success) {
            res.status(400).json({ msg: "INVALID INPUTS" });
        }
        const response = yield fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                // "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
                "X-Title": "BuildSpeak",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "mistralai/mistral-7b-instruct",
                messages: [
                    {
                        role: "user",
                        content: (0, prompts_1.getSystemPrompt)(),
                    },
                    {
                        role: "user",
                        content: req.body.basePrompt,
                    },
                    {
                        role: "user",
                        content: req.body.userPrompt,
                    },
                ],
            }),
        });
        const result = yield response.json();
        res.json((_a = result.choices[0]) === null || _a === void 0 ? void 0 : _a.message.content);
    }
    catch (error) {
        res.status(400).json({ msg: "INTERNAL SERVER ERROR" });
    }
});
exports.chatController = chatController;
