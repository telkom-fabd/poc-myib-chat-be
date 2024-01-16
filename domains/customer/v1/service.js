const repository = require('./repository');
const errorHelper = require('../../../utils/error');
const sendbird = require('../../../libraries/sendbird');

const SENDBIRD_CODE_USER_NOT_FOUND = 400201;

/**
 * Get List Customer
 * @param {Object} query values for filtering needs
 */
const index = async (query) => {
    // get data
    return await repository.list(query);
};

/**
 * Get Detail Customer
 * @param {String} id
 */
const detail = async (id) => {
    const customer = await repository.findById(id);
    if (!customer) errorHelper.throwNotFound("Customer Not Found");
    delete customer.password;
    return customer;
};

/**
 * Get Sendbird User
 * @param {String} id
 */
const getSendbirdUser = async (id) => {
    const customer = await repository.findById(id);
    if (!customer) errorHelper.throwNotFound("Customer Not Found");

    const getSendbirdUser = await sendbird.getUser(customer._id);
    if (!getSendbirdUser.isSuccess) {
        if (getSendbirdUser.code === SENDBIRD_CODE_USER_NOT_FOUND) {
            return {
                user: null,
                message: "Sendbird user Not Found",
            };
        }

        console.log(getSendbirdUser.message);
        errorHelper.throwInternalServerError();
    }

    return {
        user: getSendbirdUser.data,
        message: "Sendbird user Found",
    };
};

/**
 * Create Sendbird User
 * @param {String} id
 */
const createSendbirdUser = async (id) => {
    const customer = await repository.findById(id);
    if (!customer) errorHelper.throwNotFound("Customer Not Found");

    const getSendbirdUser = await sendbird.getUser(customer._id);
    if (getSendbirdUser.isSuccess) {
        return {
            sendbird_user: getSendbirdUser.data,
            message: "Sendbird user already exist",
        };
    }

    const result = await sendbird.createUser(customer);
    if (!result.isSuccess) errorHelper.throwInternalServerError();

    await repository.updateOne(id, {
        sendbird: {
            user_id: result.data.user_id,
            access_token: result.data.access_token
        }
    });

    return {
        sendbird_user: result.data,
        message: "Success create sendbird user",
    };
};


module.exports = {
    index,
    detail,
    getSendbirdUser,
    createSendbirdUser,
};
