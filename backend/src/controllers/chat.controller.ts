import { Response, Request } from "express";

export const chatController = async (req: Request, res: Response) => {
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
            content: req.body,
          },
        ],
      }),
    }
  );
  const result = await response.json();
  console.log(result);
  console.log(result.choices[0]?.message.content);
  res.json(result.choices[0]?.message.content);
};
