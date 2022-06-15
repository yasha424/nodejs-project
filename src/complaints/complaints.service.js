import { HTTPError } from '../errors/http-error.class.js';
import { ComplaintsRepository } from './complaints.repository.js';

export class ComplaintService {
  constructor(prismaService) {
    this.complaintsRepository = new ComplaintsRepository(prismaService);
  }

  async createComplaint({ latitude, longitude, userId, description, date }) {
    return this.complaintsRepository.create({
      latitude,
      longitude,
      userId,
      description,
      date
    });
  }

  async getAllComplaints() {
    const role = await this.complaintsRepository.getAll();
    return role ?? new HTTPError(404, `Complaints not found`);
  }

  async updateComplaint(id, data) {
    const role = await this.complaintsRepository.findById(id);
    if (!role) {
      return new HTTPError(404, `Complaint with id(${id}) not found`);
    }
    return this.complaintsRepository.update(id, data);
  }

  async deleteComplaint(id) {
    const existedRole = await this.complaintsRepository.findById(id);
    if (!existedRole) {
      return new HTTPError(404, `Complaint with id(${id}) not found`);
    }
    return this.complaintsRepository.deleteById(id);
  }
}
