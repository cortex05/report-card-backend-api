import express from "express";
import cors from "cors";

import politicianRoutes from "./routes/politicianRoutes";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/politicians", politicianRoutes);

export default app;