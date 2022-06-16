import { BaseController } from '../common/base.controller.js';
import { getWeather } from '../services/weather.service.js';
import { validationMiddleware } from '../common/validation.middleware.js';
import {
  getSchema,
  createSchema,
  updateSchema,
  deleteSchema
} from './schemas/schemas.js';
import { ComplaintService } from './complaints.service.js';

export class ComplaintController extends BaseController {
  constructor(logger, prismaService) {
    super(logger);
    this.complaintService = new ComplaintService(prismaService);

    this.bindRoutes([
      {
        path: '/',
        method: 'get',
        func: this.getAll,
        middlewares: [validationMiddleware(getSchema)]
      },
      {
        path: '/create',
        method: 'post',
        func: this.create,
        middlewares: [validationMiddleware(createSchema)]
      },
      {
        path: '/update/:id',
        method: 'put',
        func: this.update,
        middlewares: [validationMiddleware(updateSchema)]
      },
      {
        path: '/delete/:id',
        method: 'delete',
        func: this.delete,
        middlewares: [validationMiddleware(deleteSchema)]
      },
      {
        path: '/:id/weather',
        method: 'get',
        func: this.getWeatherById
      }
    ]);
  }

  async delete(req, res, next) {
    const result = await this.complaintService.deleteComplaint(
      parseInt(req.params.id, 10)
    );
    this.ok(res, result);
  }

  async update(req, res, next) {
    const result = await this.complaintService.updateComplaint(
      parseInt(req.params.id, 10),
      req.body
    );
    this.ok(res, result);
  }

  async getAll(req, res, next) {
    const result = await this.complaintService.getAllComplaints();
    this.ok(res, result);
  }

  async create(req, res, next) {
    const result = await this.complaintService.createComplaint(req.body);
    this.ok(res, result);
  }

  async getWeatherById(req, res, next) {
    try {
      const complaint = await this.complaintService.getComplaintById(
        parseInt(req.params.id, 10)
      );
      const weather = await getWeather(complaint.latitude, complaint.longitude);
      return this.ok(res, weather);
    } catch (err) {
      return this.send(res, err.statusCode, err);
    }
  }
}
