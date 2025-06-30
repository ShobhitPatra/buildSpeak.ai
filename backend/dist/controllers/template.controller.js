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
exports.templateController = void 0;
const node_1 = require("../prompts/node");
const react_1 = require("../prompts/react");
const next_1 = require("../prompts/next");
const schema_1 = require("../schema");
const templateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { success } = schema_1.templateSchema.safeParse(req.body);
        if (!success) {
            res.status(400).json({ msg: "INVALID INPUTS" });
        }
        const userPrompt = req.body.prompt;
        const response = yield fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${(_a = process.env.OPENROUTER_API_KEY) === null || _a === void 0 ? void 0 : _a.trim()}`,
                // "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
                "X-Title": "BuildSpeak",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "mistralai/mistral-7b-instruct",
                messages: [
                    {
                        role: "user",
                        content: `Decide whether this project should be built with 'node' or 'react'.
                        Only reply with one of the following words: node or react.
                        STRICT RULES:
                        - No explanations
                        - No extra words
                        - No punctuation
                        - Just one word: node or react
                        - Do NOT return anything other than the word
                        PROMPT: ${userPrompt}`,
                    },
                ],
            }),
        });
        const result = yield response.json();
        const stack = result.choices[0].message.content;
        const basePrompt = stack.trim().toLocaleLowerCase() === "node"
            ? node_1.BASE_PROMPT
            : stack.trim().toLowerCase() === "react"
                ? react_1.BASE_PROMPT
                : next_1.BASE_PROMPT;
        res.status(200).json({
            basePrompt,
            userPrompt,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json("INTERNAL SEVER ERROR");
    }
});
exports.templateController = templateController;
