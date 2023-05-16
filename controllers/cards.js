const http2 = require('node:http2');
const Card = require('../moduls/cards');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      res.status(http2.constants.HTTP_STATUS_OK).send({ data: cards });
    })
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(http2.constants.HTTP_STATUS_CREATED).send({ data: card });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с id ${req.params.cardId} не найдена`);
      }
      if (card.owner.toString() !== _id) {
        throw new ForbiddenError('Недостаточно прав для удаления данной карточки');
      }
      return Card.findByIdAndRemove(cardId)
        .then(() => {
          res.status(http2.constants.HTTP_STATUS_OK).send({ data: card });
        });
    })
    .catch(next);
};

const putLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с id ${req.params.cardId} не найдена`);
      }
      res.status(http2.constants.HTTP_STATUS_OK).send({ data: card });
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с id ${req.params.cardId} не найдена`);
      }
      res.status(http2.constants.HTTP_STATUS_OK).send({ data: card });
    })
    .catch(next);
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
};
