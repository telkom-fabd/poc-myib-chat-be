const {Merchant} = require('../merchant');
const mongoQuery = require('../../../utils/mongoQuery');
const constant = require('./constant');

/**
 * Get List Data
 * @param {Object} params
 */
const list = async (params) => {
    // init aggregate pipelines
    let pipelines = [];

    // init filters
    let filters = [];

    // filter : search
    if (params.search && params.search !== "") {
        filters.push({
            $or: [
                {name: mongoQuery.searchLike(params.search)},
            ]
        });
    }

    // assign filters to pipelines
    if (filters.length > 0) {
        pipelines.push({$match: {$and: filters}});
    }

    // sort
    pipelines.push({
        $sort: mongoQuery.getSort(params.sort_by, 'name', params.sort_dir, 'asc'),
    });

    // get total merchant
    let total = await Merchant.countDocuments();

    // get total filtered
    let totalFiltered = 0;
    let totalFilteredPipeline = []
    totalFilteredPipeline.push(...pipelines);
    totalFilteredPipeline.push({$count: 'total'});
    let resTotalFiltered = await Merchant.aggregate(totalFilteredPipeline);
    if (resTotalFiltered && resTotalFiltered.length > 0) {
        totalFiltered = resTotalFiltered[0].total;
    }

    // pagination
    if (params.page && params.limit) {
        let pageVal = parseInt(params.page);
        let limitVal = parseInt(params.limit);
        let skip = (pageVal - 1) * limitVal;
        pipelines.push({$limit: skip + limitVal}, {$skip: skip});
    }

    // get data
    const data = await Merchant.aggregate(pipelines);
    for (let i = 0; i < data.length; i++) {
        delete data[i].password;
    }

    // return
    return {
        data: data,
        meta: {
            page: params.page,
            limit: params.limit,
            total: total,
            total_filtered: totalFiltered,
        },
    };
};

/**
 * Find By ID
 * @param {String} id
 */
const findById = async (id) => {
    return Merchant.findOne({_id: id});
};

/**
 * Find By Email
 * @param {String} email
 */
const findByEmail = async (email) => {
    return Merchant.findOne({email: email});
};

/**
 * Create New Data
 * @param {Object} data
 */
const save = async (data) => {
    let merchant = new Merchant(data);
    return merchant.save();
};

/**
 * Update One Data with filter ID
 * @param {String} id
 * @param {Object} data
 */
const updateOne = async (id, data) => {
    return Merchant.findOneAndUpdate({_id: id}, data, {
        returnOriginal: false,
    });
};

/**
 * Delete One Data with filter ID
 * @param {String} id
 */
const deleteOne = async (id) => {
    return Merchant.deleteOne({_id: id});
};

module.exports = {
    list,
    findById,
    findByEmail,
    save,
    updateOne,
    deleteOne,
};
