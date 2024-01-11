const joi = require('joi');

const update = joi.object({
    name: joi.string().allow("", null),
});

module.exports = {
    update,
};
