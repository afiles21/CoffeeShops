const userController = require('../controllers/user');
const { authenticate } = require('../config/jwt')

module.exports = app => {
    app.post('/api/register', userController.register);
    app.post('/api/login', userController.login);
    app.post('/api/logout', userController.logout);
    // Require Authentication
    app.get('/api/users', authenticate, userController.findAll);
}