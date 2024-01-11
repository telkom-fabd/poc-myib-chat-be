const errorHelper = require('../../../utils/error');
const logger = require('../../../utils/logger');
const respond = require('../../../utils/respond');
const service = require('./service');

/**
 * Register Merchant
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const registerMerchant = async (req, res) => {
    try {
        const result = await service.registerMerchant(req.body);
        return respond.responseSuccess(res, "Merchant Registered", result, undefined);
    } catch (e) {
        if (e.name === errorHelper.BAD_REQUEST) {
            return respond.responseBadRequest(res, e.message);
        }

        logger.error(e);
        return respond.responseError(res, e.statusCode, e.message);
    }
};

/**
 * Login Merchant
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const loginMerchant = async (req, res) => {
    try {
        const result = await service.loginMerchant(req.body);
        return respond.responseSuccess(res, "Merchant Logged In", result, undefined);
    } catch (e) {
        if (e.name === errorHelper.BAD_REQUEST) {
            return respond.responseBadRequest(res, e.message);
        }

        logger.error(e);
        return respond.responseError(res, e.statusCode, e.message);
    }
};

/**
 * Register Customer
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const registerCustomer = async (req, res) => {
    try {
        const result = await service.registerCustomer(req.body);
        return respond.responseSuccess(res, "Customer Registered", result, undefined);
    } catch (e) {
        if (e.name === errorHelper.BAD_REQUEST) {
            return respond.responseBadRequest(res, e.message);
        }

        logger.error(e);
        return respond.responseError(res, e.statusCode, e.message);
    }
};

/**
 * Login Customer
 * @param {Object} req express request object
 * @param {Object} res express response object
 */
const loginCustomer = async (req, res) => {
    try {
        const result = await service.loginCustomer(req.body);
        return respond.responseSuccess(res, "Merchant Logged In", result, undefined);
    } catch (e) {
        if (e.name === errorHelper.BAD_REQUEST) {
            return respond.responseBadRequest(res, e.message);
        }

        logger.error(e);
        return respond.responseError(res, e.statusCode, e.message);
    }
};

module.exports = {
    registerMerchant,
    loginMerchant,
    registerCustomer,
    loginCustomer,
};
