const authApiV1 = require('../domains/auth/v1/api');

const setPublicRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello From POC MYIB CHAT API!');
    });
    app.use('/api/v1/auth', authApiV1);
};

module.exports = setPublicRoutes;
