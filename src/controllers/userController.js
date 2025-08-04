const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.code(201).send(user);
  } catch (error) {
    console.log("Create User Error:", error);
    res.code(500).send({ error: "Failed to create user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
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
    const updatedUser = await userService.updateUser(req.params.id, req.body);
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




module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
