const errorHelper = require('../../../utils/error');
const logger = require('../../../utils/logger');
const respond = require('../../../utils/respond');
const service = require('./service');

/**
 * Get List Customer
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const index = async (req, res) => {
    try {
        const result = await service.index(req.query);
        return respond.responseSuccess(res, "Customer List retrieved successfully", result.data, result.meta);
    } catch (e) {
        logger.info(e);
        return respond.responseError(res, e.statusCode, e.message);
    }
};

/**
 * Get Detail Customer
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const detail = async (req, res) => {
    try {
        const result = await service.detail(req.params.id);
        return respond.responseSuccess(res, "Customer retrieved successfully", result, undefined);
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
    createSendbirdUser,
};
