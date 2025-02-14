const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const pool = require("../config/db");

const router = express.Router();

router.post(
  "/register",
  [
    check("name", "Imię jest wymagane").not().isEmpty(),
    check("email", "Podaj poprawny email").isEmail(),
    check("password", "Hasło musi mieć min. 6 znaków").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    try {
      const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ msg: "Użytkownik z takim emailem już istnieje" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hashedPassword]);
      res.status(201).json({ msg: "Rejestracja udana" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.post(
  "/login",
  [check("email", "Podaj poprawny email").isEmail(), check("password", "Hasło jest wymagane").exists()],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (user.rows.length === 0) return res.status(400).json({ msg: "Niepoprawne dane" });

      const isMatch = await bcrypt.compare(password, user.rows[0].password);
      if (!isMatch) return res.status(400).json({ msg: "Niepoprawne dane" });

      const token = jwt.sign({ user: { id: user.rows[0].id } }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;