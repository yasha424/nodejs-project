import { HTTPError } from '../errors/http-error.class.js';

export class RolesRepository {
  constructor(prismaService) {
    this.prismaService = prismaService;
  }

  async create({ name }) {
    return this.prismaService.client.role.create({
      data: {
        name
      }
    });
  }

  async update(id, data) {
    return this.prismaService.client.role.update({
      where: {
        id
      },
      data
    });
  }

  async findById(id) {
    return this.prismaService.client.role.findFirst({
      where: {
        id
      }
    });
  }

  async deleteById(id) {
    return this.prismaService.client.role.delete({
      where: {
        id
      }
    });
  }
}
