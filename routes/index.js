const index = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createUser, login,
} = require('../controllers/users');

const pageNotFoundError = (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
};

index.use('/users', require('./users'));
index.use('/cards', require('./cards'));

index.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/(((https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/),
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

index.use('/', pageNotFoundError);

module.exports = index;
