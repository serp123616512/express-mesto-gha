const express = require('express');

const {
  getUsers,
  getUser,
  postUser,
  patchUserProfile,
  patchUserAvatar,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUser);
userRouter.post('/', postUser);
userRouter.patch('/me', patchUserProfile);
userRouter.patch('/me/avatar', patchUserAvatar);

module.exports = userRouter;
