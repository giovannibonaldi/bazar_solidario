const express = require("express");
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");
const Item = require("../models/Item");
const router = express.Router();

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });

// Rota para listar itens
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().populate("owner", "name");
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor.");
  }
});

// Rota para criar um item
router.post("/", auth, upload.single("itemImage"), async (req, res) => {
  // 💡 Adicione esta verificação para garantir que o arquivo foi enviado
  if (!req.file) {
    return res.status(400).json({ msg: "Nenhuma imagem enviada." });
  }

  const { title, description, price, isDonation } = req.body;

  try {
    const newItem = new Item({
      title,
      description,
      price: isDonation === "true" ? 0 : price, // ⚠️ Note a mudança aqui
      isDonation: isDonation === "true",
      imageUrl: `/uploads/${req.file.filename}`,
      owner: req.user.id,
    });
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor.");
  }
});

module.exports = router;
