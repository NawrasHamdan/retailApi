const Joi = require('joi');

const registerValidator = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(3).max(32).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const loginValidator = Joi.object({
    password: Joi.required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
});


module.exports = {
    registerValidator,
    loginValidator
}

