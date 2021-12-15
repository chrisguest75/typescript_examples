// src/app.ts
import express from "express";
import pino from "express-pino-logger";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";

export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(pino());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(undefined, {
  swaggerUrl: '/swagger.json',
  swaggerOptions: {
    validatorUrl : null
  }
}));


RegisterRoutes(app);