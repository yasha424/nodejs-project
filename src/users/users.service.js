import { HTTPError } from '../errors/http-error.class.js';
import { UsersRepository } from './users.repository.js';

export class UserService {
  constructor(prismaService) {
    this.usersRepository = new UsersRepository(prismaService);
  }

  async createUser({ email, name, password, roleId }) {
    const existedUser = await this.usersRepository.findByEmail(email);
    if (existedUser) {
      return null;
    }
    return this.usersRepository.create({ email, name, password, roleId });
  }

  async getUserInfo(userId) {
    return this.usersRepository.findById(userId);
  }

  async updateUser(id, data) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new HTTPError(403, `User with id(${id}) not found`);
    }
    return this.usersRepository.update(id, data);
  }

  async deleteUser(id) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      return new HTTPError(403, `User with id(${id}) not found`);
    }
    return this.usersRepository.deleteById(id);
  }

  async loginUser({ email, password }) {
    return this.usersRepository.findByEmailAndPassword({ email, password });
  }
}
