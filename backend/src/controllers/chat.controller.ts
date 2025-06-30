import { Response, Request } from "express";
import { getSystemPrompt } from "../prompts";
import { chatSchema } from "../schema";

export const chatController = async (req: Request, res: Response) => {
  try {
    const { success } = chatSchema.safeParse(req.body);
    if (!success) {
      res.status(400).json({ msg: "INVALID INPUTS" });
    }
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
              content: getSystemPrompt(),
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
      }
    );
    const result = await response.json();
    res.json(result.choices[0]?.message.content);
  } catch (error) {
    res.status(400).json({ msg: "INTERNAL SERVER ERROR" });
  }
};
