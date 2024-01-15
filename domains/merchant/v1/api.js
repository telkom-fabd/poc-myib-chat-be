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
 * Get Sendbird User
 * @api private
 */
router.get(
    '/:id/sendbird-user',
    controller.getSendbirdUser
);

/**
 * Create Sendbird User
 * @api private
 */
router.post(
    '/:id/sendbird-user',
    controller.createSendbirdUser
);


module.exports = router;
