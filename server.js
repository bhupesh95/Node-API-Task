import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import process from "process";
import routes from "./Routes/index.js";
import "./Config/db_config.js"
dotenv.config();

const app = express();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["*"]
};
app.use(cors(corsOpts));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
app.use(bodyParser.json());
routes(app);
app.listen(process.env.port, () =>
  console.log(`server running on ${process.env.port}`)
);
