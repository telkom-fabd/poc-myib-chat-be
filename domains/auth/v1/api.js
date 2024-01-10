const express = require('express');
const inputValidation = require('../../../middlewares/inputValidation');
const controller = require('./controller');
const validation = require('./validation');

const router = express.Router();

/**
 * Register Merchant
 * @api public
 */
router.post(
    '/register-merchant',
    inputValidation(validation.registerMerchant),
    controller.registerMerchant
);

/**
 * Login Merchant
 * @api public
 */
router.post(
    '/login-merchant',
    inputValidation(validation.loginMerchant),
    controller.loginMerchant
);

module.exports = router;
