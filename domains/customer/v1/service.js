const repository = require('./repository');
const errorHelper = require('../../../utils/error');
const sendbird = require('../../../libraries/sendbird');

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
 * Create Sendbird User
 * @param {String} id
 */
const createSendbirdUser = async (id) => {
    const customer = await repository.findById(id);
    if (!customer) errorHelper.throwNotFound("Customer Not Found");

    const getSendbirdUser = await sendbird.getUser(customer._id);
    if (getSendbirdUser.isSuccess) {
        return {
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
        message: "Success create sendbird user",
    };
};


module.exports = {
    index,
    detail,
    createSendbirdUser,
};
