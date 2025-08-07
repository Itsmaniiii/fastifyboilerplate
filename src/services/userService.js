const UserRepository = require('../repositories/userRepository');
const userRepo = new UserRepository();

class UserService {
  async createUser(data) {
    return await userRepo.create(data);
  }

  async findAll() {
  return await userRepo.find({ where: { isDeleted: false } });
}


  async getUserById(id) {
    return await userRepo.findById(id);
  }
  async updateUser(id, data) {
  return await userRepo.update(id, data);
  }
  async deleteUser(id) {
  return await userRepo.softDelete(id);
}


}

module.exports = new UserService();
