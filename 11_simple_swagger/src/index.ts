import express, { Application } from "express";
import pino from "express-pino-logger";
//import { logger } from "./logger";

const PORT = process.env.PORT || 8000;

const app: Application = express();
//app.use(express.json);
//app.use(pino({ logger: logger }));
app.use(pino());
//app.use(express.static("public"));

app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

