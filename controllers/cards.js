const Card = require('../moduls/cards');

const ERROR_CODE_VALIDATION = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_ON_SERVER = 500;

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(() => res.status(ERROR_CODE_ON_SERVER).send({ message: 'Произошла ошибка на сервере' }));
};

const postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_VALIDATION).send({ message: 'Введены некорректные данные' });
      }
      return res.status(ERROR_CODE_ON_SERVER).send({ message: 'Произошла ошибка на сервере' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
      }
      return res.status(ERROR_CODE_ON_SERVER).send({ message: 'Произошла ошибка на сервере' });
    });
};

const putLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .orFail()
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
      }
      return res.status(ERROR_CODE_ON_SERVER).send({ message: 'Произошла ошибка на сервере' });
    });
};

const deleteLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .orFail()
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
      }
      return res.status(ERROR_CODE_ON_SERVER).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
};
