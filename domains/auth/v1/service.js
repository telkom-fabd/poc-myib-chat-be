const merchantRepository = require('../../merchant/v1/repository')
const merchantConstant = require('../../merchant/v1/constant');
const customerRepository = require('../../customer/v1/repository')
const customerConstant = require('../../customer/v1/constant');
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
    body.status = merchantConstant.STATUS_ACTIVE;

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
        role: merchantConstant.ROLE_MERCHANT,
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
        role: merchantConstant.ROLE_MERCHANT,
    };
    const accessToken = encryption.generateJWT(payloadJWT);

    // return
    return {
        access_token: accessToken,
        user: merchant
    };
};

/**
 * Register Customer
 * @param {Object} body
 */
const registerCustomer = async (body) => {
    // find exist customer with email
    const existCustomer = await customerRepository.findByEmail(body.email);
    if (existCustomer) errorHelper.throwBadRequest(`Customer with email ${body.email} is already exist`);

    // registered at
    body.registered_at = dateFormat.nowUtc7();

    // status
    body.status = customerConstant.STATUS_ACTIVE;

    // encrypt password
    body.password = encryption.encryptPassword(body.password);

    // create customer
    const customer = await customerRepository.save(body);

    // generate JWT
    const payloadJWT = {
        id: customer._id,
        email: customer.email,
        name: customer.name,
        avatar: customer.avatar,
        role: customerConstant.ROLE_CUSTOMER,
    };
    const accessToken = encryption.generateJWT(payloadJWT);

    // return
    return {
        access_token: accessToken,
        user: customer
    };
};

/**
 * Login Customer
 * @param {Object} body
 */
const loginCustomer = async (body) => {
    // find exist customer with email
    const customer = await customerRepository.findByEmail(body.email);

    // check customer
    if (!customer) errorHelper.throwBadRequest(`Invalid Email or Password`);

    // check password
    const isPasswordValid = encryption.comparePassword(body.password, customer.password);
    if (!isPasswordValid) errorHelper.throwBadRequest(`Invalid Email or Password`);

    // generate JWT
    const payloadJWT = {
        id: customer._id,
        email: customer.email,
        name: customer.name,
        avatar: customer.avatar,
        role: customerConstant.ROLE_CUSTOMER,
    };
    const accessToken = encryption.generateJWT(payloadJWT);

    // return
    return {
        access_token: accessToken,
        user: customer
    };
};

module.exports = {
    registerMerchant,
    loginMerchant,
    registerCustomer,
    loginCustomer,
};
