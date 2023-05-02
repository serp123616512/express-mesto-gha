const express = require('express');
const http2 = require('node:http2');

const userRouter = require('./users');
const cardRouter = require('./cards');

const router = express.Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res) => res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Данный URL не существует' }));

module.exports = router;
