const mongoose = require('mongoose');
const http2 = require('node:http2');
const Card = require('../moduls/cards');

const { ValidationError, CastError, DocumentNotFoundError } = mongoose.Error;

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      res.status(http2.constants.HTTP_STATUS_OK).send({ data: cards });
    })
    .catch();
};

const postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(http2.constants.HTTP_STATUS_CREATED).send({ data: card });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      }
      return res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => {
      res.status(http2.constants.HTTP_STATUS_OK).send({ data: card });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введен некорректный идентификатор карточки' });
      }
      if (err instanceof DocumentNotFoundError) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
      }
      return res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

const putLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .orFail()
    .then((card) => {
      res.status(http2.constants.HTTP_STATUS_OK).send({ data: card });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введен некорректный идентификатор карточки' });
      }
      if (err instanceof DocumentNotFoundError) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
      }
      return res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

const deleteLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .orFail()
    .then((card) => {
      res.status(http2.constants.HTTP_STATUS_OK).send({ data: card });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введен некорректный идентификатор карточки' });
      }
      if (err instanceof DocumentNotFoundError) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
      }
      return res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
};
