import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./src/routes/auth.js";
import itemRoutes from "./src/routes/items.js";
import { startDb } from "./src/db/index.js";
import { errorMiddleware } from "./src/middleware/error.js";

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve();

// iniciar o SQLite
startDb();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
