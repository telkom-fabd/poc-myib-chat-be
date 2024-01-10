const merchantRepository = require('../../merchant/v1/repository')
const {STATUS_ACTIVE} = require('../../merchant/v1/constant');
const dateFormat = require('../../../utils/dateFormat');
const encryption = require('../../../utils/encryption');
const errorHelper = require('../../../utils/error');

/**
 * Register Merchant
 * @param {Object} body
 */
const registerMerchant = async (body) => {
    // find exist merchant with email
    const existMerchant = await merchantRepository.findByEmail(body.email);
    if (existMerchant) errorHelper.throwBadRequest(`Merchant with email ${body.email} is already exist`);

    // registered at
    body.registered_at = dateFormat.nowUtc7();

    // status
    body.status = STATUS_ACTIVE;

    // encrypt password
    body.password = encryption.encryptPassword(body.password);

    // create merchant
    const merchant = await merchantRepository.save(body);

    // generate JWT
    const payloadJWT = {
        id: merchant._id,
        email: merchant.email,
        name: merchant.name,
        avatar: merchant.avatar,
    };
    const accessToken = encryption.generateJWT(payloadJWT);

    // return
    return {
        access_token: accessToken,
        user: merchant
    };
};

/**
 * Login Merchant
 * @param {Object} body
 */
const loginMerchant = async (body) => {
    // find exist merchant with email
    const merchant = await merchantRepository.findByEmail(body.email);

    // check merchant
    if (!merchant) errorHelper.throwBadRequest(`Invalid Email or Password`);

    // check password
    const isPasswordValid = encryption.comparePassword(body.password, merchant.password);
    if (!isPasswordValid) errorHelper.throwBadRequest(`Invalid Email or Password`);

    // generate JWT
    const payloadJWT = {
        id: merchant._id,
        email: merchant.email,
        name: merchant.name,
        avatar: merchant.avatar,
    };
    const accessToken = encryption.generateJWT(payloadJWT);

    // return
    return {
        access_token: accessToken,
        user: merchant
    };
};

module.exports = {
    registerMerchant,
    loginMerchant,
};
