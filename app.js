const express = require('express');
const mongoose = require('mongoose');
const { userRouter, cardRouter } = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '644a6d0704238841fc039207',
  };

  next();
});
app.use(userRouter);
app.use(cardRouter);

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
