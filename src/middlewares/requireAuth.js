const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) res.status(401).send({ error: 'Harus login' });

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'achmadbs', async (err, payload) => {
    if (err) res.status(401).send({ error: 'Harus login' });
    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
