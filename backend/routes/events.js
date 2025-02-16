// event.js
const express = require("express");
const auth = require("../middleware/authMiddleware");
const pool = require("../config/db");

const router = express.Router();


router.get("/", auth, async (req, res) => {
  try {
    const events = await pool.query("SELECT * FROM events WHERE user_id = $1", [req.user.id]);
    res.json(events.rows); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  const { title, description, start_time, end_time } = req.body;

  if (!title || !start_time || !end_time) {
    return res.status(400).json({ error: "Tytuł, czas rozpoczęcia i zakończenia są wymagane" });
  }

  try {
    const newEvent = await pool.query(
      "INSERT INTO events (user_id, title, description, start_time, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.user.id, title, description, start_time, end_time]
    );
    res.json(newEvent.rows[0]); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;