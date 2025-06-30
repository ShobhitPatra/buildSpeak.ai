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
const prompts_1 = require("../prompts");
const next_1 = require("../prompts/next");
const templateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPrompt = req.body;
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
        console.log(stack);
        if (stack.trim().toLocaleLowerCase() === "node") {
            res.status(200).json({
                systemPrompt: (0, prompts_1.getSystemPrompt)(),
                basePrompt: node_1.BASE_PROMPT,
                userPrompt,
            });
        }
        else if (stack.trim().toLowerCase() === "react") {
            res.status(200).json({
                systemPrompt: (0, prompts_1.getSystemPrompt)(),
                basePrompt: react_1.BASE_PROMPT,
                userPrompt,
            });
        }
        else {
            res.status(200).json({
                systemPrompt: (0, prompts_1.getSystemPrompt)(),
                basePrompt: next_1.BASE_PROMPT,
                userPrompt,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json("INTERNAL SEVER ERROR");
    }
});
exports.templateController = templateController;
