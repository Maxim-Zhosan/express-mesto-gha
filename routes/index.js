const index = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  createUser, login,
} = require('../controllers/users');
const { REGEX } = require('../constants/regex');

const pageNotFoundError = (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
};

index.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGEX),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), createUser);

index.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

index.use('/users', auth, require('./users'));
index.use('/cards', auth, require('./cards'));

index.use('/', pageNotFoundError);

module.exports = index;
