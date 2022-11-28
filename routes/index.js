const index = require('express').Router();
const { NOT_FOUND } = require('../constants/errors');

const pageNotFoundError = (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена' });
};

index.use('/users', require('./users'));
index.use('/cards', require('./cards'));

index.use('/', pageNotFoundError);

module.exports = index;
