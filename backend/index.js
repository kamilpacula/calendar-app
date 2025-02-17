const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
  });
}

module.exports = app;  