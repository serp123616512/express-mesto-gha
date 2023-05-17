const express = require('express');

const {
  validationGetUserById,
  validationPatchUserProfile,
  validationPatchUserAvatar,
} = require('../middlewares/validatorsRequest/users');

const {
  getUsers,
  getUserById,
  getUserByMe,
  patchUserProfile,
  patchUserAvatar,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getUserByMe);
userRouter.get('/:userId', validationGetUserById, getUserById);
userRouter.patch('/me', validationPatchUserProfile, patchUserProfile);
userRouter.patch('/me/avatar', validationPatchUserAvatar, patchUserAvatar);

module.exports = userRouter;
