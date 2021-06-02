import express, { Application } from "express";
import pino from "express-pino-logger";
import swaggerUi from "swagger-ui-express";
import Router from "./routes/routes";


const PORT = process.env.PORT || 8000;

const app: Application = express();
app.use(express.json());
//app.use(pino({ logger: logger }));
app.use(pino());
app.use(express.static("public"));
app.use(Router);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
app.use(Router);
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

