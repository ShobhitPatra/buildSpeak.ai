import z from "zod";

export const templateSchema = z.object({
  prompt: z.string(),
});

export const chatSchema = z.object({
  userPrompt: z.string(),
  basePrompt: z.string(),
});
