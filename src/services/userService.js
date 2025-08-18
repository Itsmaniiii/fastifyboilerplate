const bcrypt = require("bcrypt");
const UserRepository = require("../repositories/userRepository");
const userRepo = new UserRepository();

class UserService {
  async createUser(data) {
    // password ko hash karo
    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);

    return await userRepo.create(data);
  }

  async findAll() {
    return await userRepo.find({ where: { isDeleted: false } });
  }

  async getUserById(id) {
    return await userRepo.findById(id);
  }

  async updateUser(id, data) {
    if (data.password) {
      const saltRounds = 10;
      data.password = await bcrypt.hash(data.password, saltRounds);
    }
    return await userRepo.update(id, data);
  }

  async deleteUser(id) {
    return await userRepo.softDelete(id);
  }
}

module.exports = new UserService();
