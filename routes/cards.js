const express = require('express');

const {
  getCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

const cardRouter = express.Router();

cardRouter.get('/', getCards);
cardRouter.post('/', postCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', putLike);
cardRouter.delete('/:cardId/likes', deleteLike);

module.exports = cardRouter;
