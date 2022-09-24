import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import process from "process";
import routes from "./Routes/index.js";
import "./Config/db_config.js";
dotenv.config();

const app = express();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["*"]
};

app.use(cors(corsOpts));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(process.env.port, () =>
  console.log(`server running on ${process.env.port}`)
);
