const Joi = require("joi");

const regsiterVaildation = (data) => {
  const Schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });
  return Schema.validate(data);
};
const loginVaildation = (data) => {
  const Schema = Joi.object({
    email: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(8).max(255).required(),
  });
  return Schema.validate(data);
};
module.exports.regsiterVaildation = regsiterVaildation;
module.exports.loginVaildation = loginVaildation;
