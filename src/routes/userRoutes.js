const userController = require('../controllers/userController');

async function userRoutes(fastify, options) {
  fastify.post('/', userController.createUser);
  fastify.get('/', userController.getAllUsers);
  fastify.get('/:id', userController.getUserById);
  fastify.put('/:id', userController.updateUser);
  fastify.delete('/:id', userController.deleteUser);
}

module.exports = userRoutes;
