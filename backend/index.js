require('dotenv').config();
console.log("📦 Chargement MONGO_URI depuis index.js:", process.env.MONGO_URI);
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/auth', require('./routes/auth'));

const { protect, authorize } = require('./middleware/auth');
let tasks = [];

app.get('/tasks', protect, (req, res) => res.json(tasks));

app.post('/tasks', protect, authorize('chef'), (req, res) => {
  tasks.push(req.body);
  res.status(201).json(req.body);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend actif sur :${PORT}`));
