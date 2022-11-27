const users = require('express').Router();
const { getUsers, getUserById, createUser, updateProfile, updateAvatar } = require('../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUserById);
users.post('/', createUser);
users.patch('/me', updateProfile);
users.patch('/me/avatar', updateAvatar);

module.exports = users;