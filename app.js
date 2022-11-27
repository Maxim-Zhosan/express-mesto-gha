const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '63827ef7e145f6b109b228b6',
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use('/', require('./routes/index'));

app.listen(PORT, () => {
  console.log('Всё ок');
});
