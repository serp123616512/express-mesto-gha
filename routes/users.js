const express = require('express');

const {
  getUsers,
  getUser,
  postUser,
  patchUserProfile,
  patchUserAvatar,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUser);
userRouter.post('/users', postUser);
userRouter.patch('/users/me', patchUserProfile);
userRouter.patch('/users/me/avatar', patchUserAvatar);

module.exports = userRouter;
