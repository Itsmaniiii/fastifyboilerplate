const dataSource = require('../../Infrastructure/postgres');

class UserRepository {
  constructor() {
    this.repo = dataSource.getRepository('User');
  }

  async create(data) {
    const newUser = this.repo.create(data);
    return await this.repo.save(newUser);
  }

  async findAll() {
  return await this.repo.find(); // removes the isDeleted filter

}


  async findById(id) {
    return await this.repo.findOne({ where: { id, isDeleted: false } });
  }
  async update(id, data) {
    const user = await this.repo.findOneBy({ id });
    if (!user) return null;
    this.repo.merge(user, data);
    return await this.repo.save(user);
  }
 

}

module.exports = UserRepository;
