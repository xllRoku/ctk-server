import express from "express";
import cors from "cors";
import morgan from "morgan";
import api from "./api/index.js";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/v1", api);

export { app };
