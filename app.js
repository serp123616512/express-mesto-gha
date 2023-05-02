const express = require('express');
const mongoose = require('mongoose');
const { userRouter, cardRouter } = require('./routes');

const { PORT = 3000 } = process.env;
const ERROR_CODE_NOT_FOUND = 404;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6450e6f0c7e6daf78ab624c0',
  };

  next();
});
app.use(userRouter);
app.use(cardRouter);
app.use('*', (req, res) => res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Данный URL не существует' }));

app.listen(PORT);
