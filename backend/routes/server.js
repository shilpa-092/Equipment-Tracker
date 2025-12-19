const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = "./equipment.json";

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all equipment
app.get("/api/equipment", (req, res) => {
  const data = readData();
  res.json(data);
});

// ADD new equipment
app.post("/api/equipment", (req, res) => {
  const data = readData();
  const newItem = {
    id: Date.now(),
    ...req.body
  };
  data.push(newItem);
  writeData(data);
  res.json(newItem);
});

// UPDATE equipment
app.put("/api/equipment/:id", (req, res) => {
  const data = readData();
  const id = Number(req.params.id);

  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  data[index] = { id, ...req.body };
  writeData(data);
  res.json(data[index]);
});

// DELETE equipment
app.delete("/api/equipment/:id", (req, res) => {
  const data = readData();
  const id = Number(req.params.id);

  const newData = data.filter(item => item.id !== id);
  writeData(newData);

  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  });
