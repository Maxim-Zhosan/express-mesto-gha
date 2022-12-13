const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { REGEX } = require('../constants/regex');

users.get('/', getUsers);
users.get('/me', getCurrentUser);
users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(REGEX),
  }),
}), updateAvatar);
users.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
}), getUserById);

module.exports = users;
