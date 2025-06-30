import dotenv from "dotenv";
import path from "path";
import express from "express";
import { templateController } from "./controllers/template.controller";
import { chatController } from "./controllers/chat.controller";
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const app = express();
app.use(express.json());

app.post("/template", templateController);
app.post("/chat", chatController);

app.listen(process.env.PORT || 8000, () => {
  console.log(`server running on PORT ${process.env.PORT}`);
});
