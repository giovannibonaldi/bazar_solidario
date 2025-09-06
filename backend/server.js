require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./src/routes/auth");
const itemRoutes = require("./src/routes/items");

const PORT = process.env.PORT || 5000;

// Conexão com o MongoDB
mongoose
  .connect("mongodb://localhost:27017/nome_do_banco", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.error(err));

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

// Rota para inserir usuário
app.post("/usuarios", (req, res) => {
  const { nome, email } = req.body;
  db.run(
    "INSERT INTO usuarios (nome, email) VALUES (?, ?)",
    [nome, email],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, nome, email });
    }
  );
});

// Rota para listar usuários
app.get("/usuarios", (req, res) => {
  db.all("SELECT * FROM usuarios", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(3001, () => console.log("Back-end rodando na porta 3001"));
