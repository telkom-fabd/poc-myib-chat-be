const repository = require('./repository');
const errorHelper = require('../../../utils/error');

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
    return merchant;
};


module.exports = {
    index,
    detail,
};
