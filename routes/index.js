const express = require('express');

const auth = require('../middlewares/auth');

const userRouter = require('./users');
const cardRouter = require('./cards');

const NotFoundError = require('../errors/NotFoundError');

const { validationSignIn, validationPostUser } = require('../middlewares/validatorsRequest/users');
const { signIn, postUser } = require('../controllers/users');

const router = express.Router();

router.post('/signup', validationPostUser, postUser);
router.post('/signin', validationSignIn, signIn);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', auth, (req, res, next) => next(new NotFoundError('Данный URL не существует')));

module.exports = router;
