const errorHelper = require('../../../utils/error');
const logger = require('../../../utils/logger');
const respond = require('../../../utils/respond');
const service = require('./service');

/**
 * Get List Merchant
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const index = async (req, res) => {
    try {
        const result = await service.index(req.query);
        return respond.responseSuccess(res, "Merchant List retrieved successfully", result.data, result.meta);
    } catch (e) {
        logger.info(e);
        return respond.responseError(res, e.statusCode, e.message);
    }
};

/**
 * Get Detail Merchant
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const detail = async (req, res) => {
    try {
        const result = await service.detail(req.params.id);
        return respond.responseSuccess(res, "Merchant retrieved successfully", result, undefined);
    } catch (e) {
        if (e.name === errorHelper.NOT_FOUND) {
            return respond.responseNotFound(res, e.message);
        }
        logger.info(e);
        return respond.responseError(res, e.statusCode, e.message);
    }
};

/**
 * Update One Merchant
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const updateOne = async (req, res) => {
    try {
        const result = await service.updateOne(req.params.id, req.body);
        return respond.responseSuccess(res, "Merchant updated successfully", result, undefined);
    } catch (e) {
        if (e.name === errorHelper.NOT_FOUND) {
            return respond.responseNotFound(res, e.message);
        }
        if (e.name === errorHelper.BAD_REQUEST) {
            return respond.responseBadRequest(res, e.message);
        }
        if (e.name === errorHelper.UNPROCESSABLE_ENTITY) {
            return respond.responseUnprocessableEntity(res, e.message);
        }
        logger.info(e);
        return respond.responseError(res, e.statusCode, e.message);
    }
};

/**
 * Delete One Merchant
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const deleteOne = async (req, res) => {
    try {
        await service.deleteOne(req.params.id);
        return respond.responseSuccess(res, "Merchant Deleted successfully", undefined, undefined);
    } catch (e) {
        if (e.name === errorHelper.NOT_FOUND) {
            return respond.responseNotFound(res, e.message);
        }
        if (e.name === errorHelper.BAD_REQUEST) {
            return respond.responseBadRequest(res, e.message);
        }
        if (e.name === errorHelper.UNPROCESSABLE_ENTITY) {
            return respond.responseUnprocessableEntity(res, e.message);
        }
        logger.info(e);
        return respond.responseError(res, e.statusCode, e.message);
    }
};

/**
 * Update Avatar Merchant
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const updateAvatar = async (req, res) => {
    try {
        const result = await service.updateAvatar(req.params.id, req.file);
        return respond.responseSuccess(res, "Merchant Avatar updated successfully", result, undefined);
    } catch (e) {
        if (e.name === errorHelper.NOT_FOUND) {
            return respond.responseNotFound(res, e.message);
        }
        if (e.name === errorHelper.BAD_REQUEST) {
            return respond.responseBadRequest(res, e.message);
        }
        if (e.name === errorHelper.UNPROCESSABLE_ENTITY) {
            return respond.responseUnprocessableEntity(res, e.message);
        }
        logger.info(e);
        return respond.responseError(res, e.statusCode, e.message);
    }
};

module.exports = {
    index,
    detail,
    updateOne,
    deleteOne,
    updateAvatar,
};
