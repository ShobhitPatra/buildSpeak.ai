import { Request, Response } from "express";
import { BASE_PROMPT as NODE_PROMPT } from "../prompts/node";
import { BASE_PROMPT as REACT_PROMPT } from "../prompts/react";

import { getSystemPrompt } from "../prompts";
import { BASE_PROMPT as NEXT_PROMPT } from "../prompts/next";

export const templateController = async (req: Request, res: Response) => {
  try {
    const userPrompt = req.body;
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          // "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
          "X-Title": "BuildSpeak", // Optional. Site title for rankings on openrouter.ai.
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
      }
    );
    const result = await response.json();
    const stack = result.choices[0].message.content as string;
    console.log(stack);
    if (stack.trim().toLocaleLowerCase() === "node") {
      res.status(200).json({
        systemPrompt: getSystemPrompt(),
        basePrompt: NODE_PROMPT,
        userPrompt,
      });
    } else if (stack.trim().toLowerCase() === "react") {
      res.status(200).json({
        systemPrompt: getSystemPrompt(),
        basePrompt: REACT_PROMPT,
        userPrompt,
      });
    } else {
      res.status(200).json({
        systemPrompt: getSystemPrompt(),
        basePrompt: NEXT_PROMPT,
        userPrompt,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("INTERNAL SEVER ERROR");
  }
};
