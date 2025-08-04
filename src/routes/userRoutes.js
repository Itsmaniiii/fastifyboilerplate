const userController = require('../controllers/userController');

async function userRoutes(app, options) {
  app.post('/', userController.createUser);
  app.get('/', userController.getAllUsers);
  app.get('/:id', userController.getUserById);
  app.put('/:id', userController.updateUser);
  app.delete('/:id', userController.deleteUser);


}


module.exports = userRoutes;
