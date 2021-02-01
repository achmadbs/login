const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, 'achmadbs');
    res.send({ token });
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).res.send({ error: 'email atau password kosong' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'Email tidak ada' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'achmadbs');
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'email atau password salah' });
  }
});

module.exports = router;
