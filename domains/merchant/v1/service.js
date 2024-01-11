const repository = require('./repository');
const errorHelper = require('../../../utils/error');
const sendbird = require('../../../libraries/sendbird');

/**
 * Get List Merchant
 * @param {Object} query values for filtering needs
 */
const index = async (query) => {
    // get data
    return await repository.list(query);
};

/**
 * Get Detail Merchant
 * @param {String} id
 */
const detail = async (id) => {
    const merchant = await repository.findById(id);
    if (!merchant) errorHelper.throwNotFound("Merchant Not Found");
    delete merchant.password;
    return merchant;
};

/**
 * Create Sendbird User
 * @param {String} id
 */
const createSendbirdUser = async (id) => {
    const merchant = await repository.findById(id);
    if (!merchant) errorHelper.throwNotFound("Merchant Not Found");

    const getSendbirdUser = await sendbird.getUser(merchant._id);
    if (getSendbirdUser.isSuccess) {
        return {
            message: "Sendbird user already exist",
        };
    }

    const result = await sendbird.createUser(merchant);
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
