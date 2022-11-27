const index = require('express').Router();

const pageNotFoundError = (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
};

index.use('/users', require('./users'));
index.use('/cards', require('./cards'));

index.use('/', pageNotFoundError);

module.exports = index;
