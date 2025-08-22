const authService = require('../services/authService');

async function loginHandler(req, reply) {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser({ email, password });

    if (!result.success) {
      return reply.code(401).send({ message: result.message });
    }

    reply.send({
      message: result.message,
      token: result.token,
      user: result.user,
    });
  } catch (err) {
    console.error('Login error:', err);
    reply.code(500).send({ message: 'Internal server error' });
  }
}

module.exports = {
  loginHandler,
};
