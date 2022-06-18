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

  async getComplaintById(id) {
    const complaint = await this.complaintsRepository.findById(id);
    if (!complaint) {
      throw new HTTPError(403, `Complaint with id(${id}) not found`);
    }
    return complaint;
  }

  async getAllComplaints() {
    const complaints = await this.complaintsRepository.getAll();
    return complaints ?? new HTTPError(403, `Complaints not found`);
  }

  async getAllComplaintsByUserId(id) {
    const complaints = await this.complaintsRepository.findByUserId();
    return complaints ?? new HTTPError(403, `Complaints not found`);
  }

  async updateComplaint(id, data) {
    const complaint = await this.complaintsRepository.findById(id);
    if (!complaint) {
      return new HTTPError(403, `Complaint with id(${id}) not found`);
    }
    return this.complaintsRepository.update(id, data);
  }

  async deleteComplaint(id) {
    const complaint = await this.complaintsRepository.findById(id);
    if (!complaint) {
      return new HTTPError(403, `Complaint with id(${id}) not found`);
    }
    return this.complaintsRepository.deleteById(id);
  }

  async deleteComplaintsByUserId(userId) {
    return this.complaintsRepository.deleteByUserId(userId);
  }
}
