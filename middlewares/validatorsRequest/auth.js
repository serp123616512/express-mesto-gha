const { celebrate, Joi } = require('celebrate');

const validationToken = celebrate({
  headers: Joi.object().keys({
    // валидируем заголовки
  }).unknown(true),
});

module.exports = validationToken;
