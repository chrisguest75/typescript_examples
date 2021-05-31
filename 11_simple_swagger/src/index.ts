import express, { Application } from "express";
import pino from "pino";

const PORT = process.env.PORT || 8000;

const app: Application = express();
app.use(express.json);
//app.use(pino({level: process.env.LOG_LEVEL || 'info'}));
app.use(express.static("public"));

app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

