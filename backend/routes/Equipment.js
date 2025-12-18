const express = require('express');
const fs = require('fs').promises;
const { v4: uuid } = require('uuid');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '../data/Equipment.json');

const readData = async () => JSON.parse(await fs.readFile(filePath, 'utf8'));
const writeData = async (data) => await fs.writeFile(filePath, JSON.stringify(data, null, 2));

router.get('/', async (req, res) => {
  const data = await readData();
  res.json(data);
});

router.post('/', async (req, res) => {
  const data = await readData();
  const newItem = { id: uuid(), ...req.body };
  data.push(newItem);
  await writeData(data);
  res.status(201).json(newItem);
});

router.put('/:id', async (req, res) => {
  const data = await readData();
  const index = data.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });
  data[index] = { ...data[index], ...req.body };
  await writeData(data);
  res.json(data[index]);
});

router.delete('/:id', async (req, res) => {
  const data = await readData();
  const filtered = data.filter(e => e.id !== req.params.id);
  await writeData(filtered);
  res.status(204).end();
});

module.exports = router;
