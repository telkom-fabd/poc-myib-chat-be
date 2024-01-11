const encryption = require('./../../utils/encryption');
const respond = require('./../../utils/respond');
const merchantRepository = require('./../../domains/merchant/v1/repository');
const merchantConstant = require('./../../domains/merchant/v1/constant');
const customerRepository = require('./../../domains/customer/v1/repository');
const customerConstant = require('./../../domains/customer/v1/constant');

module.exports = () => {
    return async (req, res, next) => {
        // get token from Bearer
        if (!req.headers.authorization) return respond.responseUnauthenticated(res, 'Access denied. No token provided.');
        const token = req.headers.authorization.split(' ')[1];

        // validate token
        if (!token) return respond.responseUnauthenticated(res, 'Access denied. No token provided.');

        // validate jwt
        const decodedJWT = encryption.verifyJWT(token);
        if (!decodedJWT) return respond.responseUnauthenticated(res, 'Invalid token');

        // find user based on role
        let user = null;
        if (decodedJWT.role === merchantConstant.ROLE_MERCHANT) {
            user = await merchantRepository.findById(decodedJWT.id);
        } else if (decodedJWT.role === customerConstant.ROLE_CUSTOMER) {
            user = await customerRepository.findById(decodedJWT.id);
        }
        if (!user) return respond.responseUnauthenticated(res, 'Invalid token');

        // add merchant to req
        req.user = user;

        // continue
        next();
    };
};
