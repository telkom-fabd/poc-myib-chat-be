const joi = require('joi');

const registerMerchant = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required().min(6),
});

const loginMerchant = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required(),
});

const registerCustomer = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required().min(6),
});

const loginCustomer = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required(),
});

module.exports = {
    registerMerchant,
    loginMerchant,
    registerCustomer,
    loginCustomer,
};
