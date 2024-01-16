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
 * Get Sendbird User
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const getSendbirdUser = async (req, res) => {
    try {
        const result = await service.getSendbirdUser(req.params.id);
        return respond.responseSuccess(res, "Sendbird User Found", result, undefined);
    } catch (e) {
        if (e.name === errorHelper.NOT_FOUND) {
            return respond.responseNotFound(res, e.message);
        }
        logger.info(e);
        return respond.responseError(res, e.statusCode, e.message);
    }
};

/**
 * Create Sendbird User
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const createSendbirdUser = async (req, res) => {
    try {
        const result = await service.createSendbirdUser(req.params.id);
        return respond.responseSuccess(res, "Create Sendbird User Success", result, undefined);
    } catch (e) {
        if (e.name === errorHelper.NOT_FOUND) {
            return respond.responseNotFound(res, e.message);
        }
        logger.info(e);
        return respond.responseError(res, e.statusCode, e.message);
    }
};


module.exports = {
    index,
    detail,
    getSendbirdUser,
    createSendbirdUser,
};
