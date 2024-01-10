const express = require('express');
const multer = require('multer');
const inputValidation = require('../../../middlewares/inputValidation');
const controller = require('./controller');
const validation = require('./validation');

// SETUP MULTER
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({storage: storage});

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
 * Update One Merchant
 * @api private
 */
router.put(
    '/:id',
    inputValidation(validation.update),
    controller.updateOne
);

/**
 * Delete One Merchant
 * @api private
 */
router.delete(
    '/:id',
    controller.deleteOne
);

/**
 * Upload Avatar Merchant
 * @api private
 */
router.post(
    '/:id/avatar',
    upload.single('avatar'),
    controller.updateAvatar
);

module.exports = router;
