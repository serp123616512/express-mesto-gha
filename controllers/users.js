const User = require('../moduls/users');

const ERROR_CODE_VALIDATION = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_ON_SERVER = 500;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(() => res.status(ERROR_CODE_ON_SERVER).send({ message: 'Произошла ошибка на сервере' }));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
      }
      return res.status(ERROR_CODE_ON_SERVER).send({ message: 'Произошла ошибка на сервере' });
    });
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_VALIDATION).send({ message: 'Введены некорректные данные' });
      }
      return res.status(ERROR_CODE_ON_SERVER).send({ message: 'Произошла ошибка на сервере' });
    });
};

const patchUserProfile = (req, res) => {
  const { name, about } = req.body;
  const { userId } = req.params;
  User.findByIdAndUpdate(userId, { name, about })
    .orFail()
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_VALIDATION).send({ message: 'Введены некорректные данные' });
      }
      return res.status(ERROR_CODE_ON_SERVER).send({ message: 'Произошла ошибка на сервере' });
    });
};

const patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const { userId } = req.params;
  User.findByIdAndUpdate(userId, { avatar })
    .orFail()
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_VALIDATION).send({ message: 'Введены некорректные данные' });
      }
      return res.status(ERROR_CODE_ON_SERVER).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  patchUserProfile,
  patchUserAvatar,
};