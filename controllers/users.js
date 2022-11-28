const User = require('../models/user');
const {
  INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND, CREATED,
} = require('../constants/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Что-то пошло нет так...' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
        // Не очень понял здесь, что исправить. В задании указаны следующие возможные ошибки по этому роуту:  "404 — Пользователь по указанному _id не найден. 500 — Ошибка по умолчанию."
        // И ещё я проверил в Postman все ошибки, которые связаны с необработкой в контроллерах запросов, у меня они обрабатываются. Может пришлёте скришоты, как у Вас?
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Что-то пошло нет так...' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, вернётся ошибка
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } if (err.name === 'CastError') {
        return res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Что-то пошло нет так...' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, вернётся ошибка
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      } if (err.name === 'CastError') {
        return res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Что-то пошло нет так...' });
    });
};
