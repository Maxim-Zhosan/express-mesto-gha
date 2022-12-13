const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { errHandler } = require('./middlewares/err-handler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use('/', require('./routes/index'));

app.use(errors());
app.use((err, req, res, next) => errHandler(err, req, res, next));

app.listen(PORT, () => {
  console.log('Всё ок');
});
