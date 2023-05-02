const mongoose = require('mongoose');
const http2 = require('node:http2');
const User = require('../moduls/users');

const { ValidationError, CastError, DocumentNotFoundError } = mongoose.Error;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(http2.constants.HTTP_STATUS_OK).send({ data: users });
    })
    .catch(() => res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' }));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(http2.constants.HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введен некорректный идентификатор пользователя' });
      }
      if (err instanceof DocumentNotFoundError) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
      }
      return res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(http2.constants.HTTP_STATUS_CREATED).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      }
      return res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

const patchUserProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { runValidators: true, new: true })
    .orFail()
    .then((user) => {
      res.status(http2.constants.HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введен некорректный идентификатор пользователя' });
      }
      if (err instanceof DocumentNotFoundError) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: `Пользователь с id ${userId} не найден` });
      }
      if (err instanceof ValidationError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      }
      return res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

const patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { runValidators: true, new: true })
    .orFail()
    .then((user) => {
      res.status(http2.constants.HTTP_STATUS_OK).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введен некорректный идентификатор пользователя' });
      }
      if (err instanceof DocumentNotFoundError) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: `Пользователь с id ${userId} не найден` });
      }
      if (err instanceof ValidationError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      }
      return res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  patchUserProfile,
  patchUserAvatar,
};
