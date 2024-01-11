const customerApiV1 = require('../domains/customer/v1/api');
const merchantApiV1 = require('../domains/merchant/v1/api');
const jwtValidation = require('../middlewares/jwtValidation');

const setPrivateRoutes = (app) => {
    // set middleware
    app.use(jwtValidation());

    // set routes
    app.use('/api/v1/customers', customerApiV1);
    app.use('/api/v1/merchants', merchantApiV1);
};

module.exports = setPrivateRoutes;
