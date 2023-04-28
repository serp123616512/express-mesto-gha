const User = require('../moduls/users');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch();
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch();
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch();
};

const patchUserProfile = (req, res) => {
  const { name, about } = req.body;
  const { userId } = req.params;
  User.findByIdAndUpdate(userId, { name, about })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch();
};

const patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const { userId } = req.params;
  User.findByIdAndUpdate(userId, { avatar })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch();
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  patchUserProfile,
  patchUserAvatar,
};
