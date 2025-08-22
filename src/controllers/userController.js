const userService = require('../services/userService');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Send all required fields
    const user = await userService.createUser({
      name,
      email,
      password: hashedPassword,
    });

    res.code(201).send(user);
  } catch (error) {
    console.log("Create User Error:", error);
    res.code(500).send({ error: "Failed to create user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAll(); // ✅ Corrected function name
    res.code(200).send(users);
  } catch (error) {
    console.error("Get Users Error:", error);
    res.code(500).send({ error: "Failed to get users" });
  }
};



const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.code(404).send({ error: "User not found" });
    }
    res.code(200).send(user);
  } catch (error) {
    console.error("Get User Error:", error);
    res.code(500).send({ error: "Failed to get user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;

    let updatedData = { ...otherData };

    // If password is provided, hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await userService.updateUser(req.params.id, updatedData);

    if (!updatedUser) {
      return res.code(404).send({ error: "User not found" });
    }

    res.code(200).send(updatedUser);
  } catch (error) {
    console.error("Update User Error:", error);
    res.code(500).send({ error: "Failed to update user" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    if (!result) {
      return res.code(404).send({ error: "User not found" });
    }
    res.code(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.code(500).send({ error: "Failed to delete user" });
  }
};


const loginUser = async (req, reply) => {
  try {
    const { name, email, password } = req.body;

    const result = await userService.loginUser(name, email, password);
    if (result.success) {
      reply.code(200).send({
        message: 'Login successful',
        token: result.token,
        user: result.user
      });
    } else {
      reply.code(401).send({ message: 'Login failed: ' + result.message });
    }
  } catch (err) {
    console.error('Login Error:', err);
    reply.code(500).send({ message: 'Internal Server Error' });
  }
};



module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
