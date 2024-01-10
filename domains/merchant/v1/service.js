const repository = require('./repository');
const errorHelper = require('../../../utils/error');
const fileHelper = require("../../../utils/fileHelper");

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

/**
 * Update One Merchant
 * @param {String} id
 * @param {Object} body
 */
const updateOne = async (id, body) => {
    const merchant = await repository.findById(id);
    if (!merchant) errorHelper.throwNotFound("Merchant Not Found");

    // update merchant
    let updatedMerchant = await repository.updateOne(id, body);
    if (!updatedMerchant) errorHelper.throwInternalServerError("Update Merchant Failed");

    return updatedMerchant;
};

/**
 * Delete One Merchant
 * @param {String} id
 */
const deleteOne = async (id) => {
    const merchant = await repository.findById(id);
    if (!merchant) errorHelper.throwNotFound("Merchant Not Found");

    // delete merchant
    let deletedMerchant = await repository.deleteOne(id);
    if (!deletedMerchant) errorHelper.throwInternalServerError("Delete Merchant Failed");

    return true;
};

/**
 * Update Avatar Merchant
 * @param {String} id
 * @param {Object} file
 */
const updateAvatar = async (id, file) => {
    const merchant = await repository.findById(id);
    if (!merchant) errorHelper.throwNotFound("Merchant Not Found");

    // upload file
    let uploadedFile = await fileHelper.upload(file.buffer);
    if (!uploadedFile) errorHelper.throwInternalServerError("Upload File Failed");

    // update merchant
    const updateData = {
        avatar: uploadedFile.secure_url,
    };
    let updatedMerchant = await repository.updateOne(id, updateData);
    if (!updatedMerchant) errorHelper.throwInternalServerError("Update Avatar Merchant Failed");

    return updatedMerchant;
};


module.exports = {
    index,
    detail,
    updateOne,
    deleteOne,
    updateAvatar,
};
