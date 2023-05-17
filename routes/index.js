const express = require('express');
const http2 = require('node:http2');

const auth = require('../middlewares/auth');

const userRouter = require('./users');
const cardRouter = require('./cards');

const { validationSignIn, validationPostUser } = require('../middlewares/validatorsRequest/users');
const { signIn, postUser } = require('../controllers/users');

const router = express.Router();

router.use('/signup', validationPostUser, postUser);
router.use('/signin', validationSignIn, signIn);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', (req, res) => res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Данный URL не существует' }));

module.exports = router;
