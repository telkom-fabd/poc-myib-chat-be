const encryption = require('./../../utils/encryption');
const respond = require('./../../utils/respond');
const merchantRepository = require('./../../domains/merchant/v1/repository');

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

        // find merchant
        const merchant = await merchantRepository.findById(decodedJWT.id);
        if (!merchant) return respond.responseUnauthenticated(res, 'Invalid token');

        // add merchant to req
        req.user = merchant;

        // continue
        next();
    };
};
