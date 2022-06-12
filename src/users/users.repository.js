import { HTTPError } from '../errors/http-error.class.js';

export class UsersRepository {
  constructor(prismaService) {
    this.prismaService = prismaService;
  }

  async create({ email, password, name, roleId }) {
    return this.prismaService.client.user.create({
      data: {
        email,
        password,
        name,
        roleId
      }
    });
  }

  async update(id, data) {
    return this.prismaService.client.user.update({
      where: {
        id
      },
      data
    });
  }

  async findByEmail(email) {
    return this.prismaService.client.user.findFirst({
      where: {
        email
      }
    });
  }

  async findById(id) {
    return this.prismaService.client.user.findFirst({
      where: {
        id
      }
    });
  }

  async findByEmailAndPassword({ email, password }) {
    return this.prismaService.client.user.findFirst({
      where: {
        email,
        password
      }
    });
  }

  async deleteById(id) {
    return this.prismaService.client.user.delete({
      where: {
        id
      }
    });
  }
}
