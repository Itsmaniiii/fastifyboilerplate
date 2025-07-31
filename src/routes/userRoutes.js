// async function userRoutes(fastify, options) {
//   const userRepo = fastify.orm.getRepository('User');

//   // 🔸 Create a new user
//   fastify.post('/users', async (req, reply) => {
//     try {
//       const { name, email, password } = req.body;

//       const existingUser = await userRepo.findOneBy({ email });
//       if (existingUser) {
//         return reply.code(400).send({ message: 'User already exists' });
//       }

//       const newUser = userRepo.create({ name, email, password });
//       const result = await userRepo.save(newUser);

//       reply.code(201).send(result);
//     } catch (error) {
//       reply.code(500).send({ error: 'Failed to create user', details: error.message });
//     }
//   });

//   // 🔸 Get all users (excluding soft-deleted ones)
//   fastify.get('/users', async (req, reply) => {
//     try {
//       const users = await userRepo.find({ where: { isDeleted: false } });
//       reply.send(users);
//     } catch (error) {
//       reply.code(500).send({ error: 'Failed to fetch users', details: error.message });
//     }
//   });

//   // 🔸 Get user by ID
//   fastify.get('/users/:id', async (req, reply) => {
//     try {
//       const user = await userRepo.findOneBy({ id: req.params.id, isDeleted: false });
//       if (!user) return reply.code(404).send({ message: 'User not found' });
//       reply.send(user);
//     } catch (error) {
//       reply.code(500).send({ error: 'Failed to get user', details: error.message });
//     }
//   });

//   // 🔸 Update user by ID
//   fastify.put('/users/:id', async (req, reply) => {
//     try {
//       const user = await userRepo.findOneBy({ id: req.params.id });
//       if (!user || user.isDeleted) return reply.code(404).send({ message: 'User not found' });

//       const updated = Object.assign(user, req.body);
//       const result = await userRepo.save(updated);
//       reply.send(result);
//     } catch (error) {
//       reply.code(500).send({ error: 'Failed to update user', details: error.message });
//     }
//   });

//   // 🔸 Soft-delete user by ID
//   fastify.delete('/users/:id', async (req, reply) => {
//     try {
//       const user = await userRepo.findOneBy({ id: req.params.id });
//       if (!user || user.isDeleted) return reply.code(404).send({ message: 'User not found' });

//       user.isDeleted = true;
//       await userRepo.save(user);
//       reply.send({ message: 'User soft-deleted' });
//     } catch (error) {
//       reply.code(500).send({ error: 'Failed to delete user', details: error.message });
//     }
//   });
// }

// module.exports = userRoutes;
