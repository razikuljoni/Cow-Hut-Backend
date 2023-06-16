import cors from "cors";
import express from "express";
const app = express();

// Cors setup
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// app.use("/api/v1/");

export default app;
