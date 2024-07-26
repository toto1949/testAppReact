const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3080; // Port where the server will run

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.get("/verify", (req, res) => {
  res.json({ message: "Verification endpoint hit", status: "success" });
});

app.post("/verify", (req, res) => {
  const { data } = req.body;
  res.json({ message: "Data received", data });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
