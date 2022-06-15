import { HTTPError } from '../errors/http-error.class.js';

export class ComplaintsRepository {
  constructor(prismaService) {
    this.prismaService = prismaService;
  }

  async create({ latitude, longitude, userId, description, date }) {
    return this.prismaService.client.complaint.create({
      data: {
        latitude,
        longitude,
        userId,
        description,
        date
      }
    });
  }

  async update(id, data) {
    return this.prismaService.client.complaint.update({
      where: {
        id
      },
      data
    });
  }

  async getAll() {
    return this.prismaService.client.complaint.findMany();
  }

  async findById(id) {
    return this.prismaService.client.complaint.findFirst({
      where: {
        id
      }
    });
  }

  async deleteById(id) {
    return this.prismaService.client.complaint.delete({
      where: {
        id
      }
    });
  }
}
