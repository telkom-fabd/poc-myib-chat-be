const express = require('express');
const controller = require('./controller');

// SETUP ROUTER
const router = express.Router();

/**
 * Get List Merchant
 * @api private
 */
router.get(
    '/',
    controller.index
);

/**
 * Get Detail Merchant
 * @api private
 */
router.get(
    '/:id',
    controller.detail
);

/**
 * Create Sendbird User
 * @api private
 */
router.post(
    '/:id/create-sendbird-user',
    controller.createSendbirdUser
);


module.exports = router;
