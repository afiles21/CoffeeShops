const cafeController = require('../controllers/cafe');

module.exports = app => {
    app.get('/api/cafes', cafeController.findAll);
    app.post('/api/cafes', cafeController.createCafe);
    app.get('/api/cafes/:id', cafeController.findOneCafe);
    app.patch('/api/cafes/:id', cafeController.editCafe);
    app.delete('/api/cafes/:id', cafeController.deleteCafe);
}