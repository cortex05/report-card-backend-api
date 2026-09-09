import express from "express";
import politicianRoutes from "./routes/politicianRoutes";

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/politicians", politicianRoutes);

export default app;