const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });

router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ message: 'Champs manquants' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email déjà utilisé' });

  const user = await User.create({ email, password, role });
  res.status(201).json({ token: generateToken(user) });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: 'Identifiants invalides' });

  res.json({ token: generateToken(user) });
});

module.exports = router;
