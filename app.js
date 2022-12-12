const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use('/', require('./routes/index'));

app.use(errors());
app.use((err, req, res, next) => {
  if (!err.statusCode) {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  }
  res.status(err.statusCode).send({ message: err.message });
  next();
});

app.listen(PORT, () => {
  console.log('Всё ок');
});
