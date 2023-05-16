const express = require('express');

const {
  validationPostCard,
  validationCardId,
} = require('../middlewares/validatorsRequest/cards');

const {
  getCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

const cardRouter = express.Router();

cardRouter.get('/', getCards);
cardRouter.post('/', validationPostCard, postCard);
cardRouter.delete('/:cardId', validationCardId, deleteCard);
cardRouter.put('/:cardId/likes', validationCardId, putLike);
cardRouter.delete('/:cardId/likes', validationCardId, deleteLike);

module.exports = cardRouter;
