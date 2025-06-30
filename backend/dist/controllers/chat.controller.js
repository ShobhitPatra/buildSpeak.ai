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
const chatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { userPrompt, systemPrompt, basePrompt } = req.body;
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
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: basePrompt,
                },
                {
                    role: "user",
                    content: userPrompt.prompt,
                },
            ],
        }),
    });
    const result = yield response.json();
    console.log(result);
    console.log((_a = result.choices[0]) === null || _a === void 0 ? void 0 : _a.message.content);
    res.json((_b = result.choices[0]) === null || _b === void 0 ? void 0 : _b.message.content);
});
exports.chatController = chatController;
