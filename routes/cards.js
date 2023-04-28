const express = require('express');

const {
  getCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

const cardRouter = express.Router();

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', postCard);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.put('/cards/:cardId/likes', putLike);
cardRouter.delete('/cards/:cardId/likes', deleteLike);

module.exports = cardRouter;
