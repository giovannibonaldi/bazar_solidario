import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user/index.js";
import { userRepo } from "../db/user.js";

const router = express.Router();

// Rota de registro

function signIn(user, res) {
  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 }, // 1 hora
    (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: { name: user.name, email: user.email },
      });
    }
  );
}

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userRepo.findByEmail(email);
    if (user) {
      return res.status(409).json({ msg: "Usuário já existe." });
    }

    user = new User(name, email);
    await user.hashPassword(password);
    const id = await userRepo.create(user);
    user.id = id;

    signIn(user, res);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
});

// Rota de login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userRepo.findByEmail(email);
    if (!user) return res.status(400).json({ msg: "Credenciais inválidas." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Credenciais inválidas." });
    }

    signIn(user, res);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
});

export default router;
