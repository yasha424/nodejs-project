import { BaseController } from '../common/base.controller.js';
import { getWeather } from '../services/weather.service.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import {
  getSchema,
  createSchema,
  updateSchema,
  deleteSchema
} from './schemas/schemas.js';
import { ComplaintService } from './complaints.service.js';
import { RoleService } from '../roles/roles.service.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export class ComplaintController extends BaseController {
  constructor(logger, prismaService) {
    super(logger);
    this.complaintService = new ComplaintService(prismaService);
    this.roleService = new RoleService(prismaService);

    this.bindRoutes([
      {
        path: '/',
        method: 'get',
        func: this.getAllComplaints,
        middlewares: [validationMiddleware(getSchema)]
      },
      {
        path: '/:id',
        method: 'get',
        func: this.getAllComplaintsById,
        middlewares: [validationMiddleware(getSchema)]
      },
      {
        path: '/create',
        method: 'post',
        func: this.createComplaint,
        middlewares: [authMiddleware, validationMiddleware(createSchema)]
      },
      {
        path: '/update/:id',
        method: 'put',
        func: this.updateComplaint,
        middlewares: [authMiddleware, validationMiddleware(updateSchema)]
      },
      {
        path: '/delete/:id',
        method: 'delete',
        func: this.deleteComplaint,
        middlewares: [authMiddleware, validationMiddleware(deleteSchema)]
      },
      {
        path: '/:id/weather',
        method: 'get',
        func: this.getWeatherByComplaintId
      }
    ]);
  }

  async deleteComplaint(req, res, next) {
    const role = await this.roleService.getRoleInfo(req.user.roleId);
    const complaint = await this.complaintService.getComplaintById(
      parseInt(req.params.id, 10)
    );

    if (complaint.userId !== req.user.id && role.name !== 'admin') {
      return this.send(res, 403, 'You have no access to delete this complaint');
    }

    const result = await this.complaintService.deleteComplaint(
      parseInt(req.params.id, 10)
    );
    return this.ok(res, result);
  }

  async updateComplaint(req, res, next) {
    const role = await this.roleService.getRoleInfo(req.user.roleId);

    const complaint = await this.complaintService.getComplaintById(
      parseInt(req.params.id, 10)
    );

    if (complaint.userId !== req.user.id && role.name !== 'admin') {
      return this.send(res, 403, 'You have no access to change this complaint');
    }

    const result = await this.complaintService.updateComplaint(
      parseInt(req.params.id, 10),
      req.body
    );
    return this.ok(res, result);
  }

  async getAllComplaints(req, res, next) {
    const result = await this.complaintService.getAllComplaints();
    return this.ok(res, result);
  }

  async getAllComplaintsById(req, res, next) {
    const result = await this.complaintService.getAllComplaintsByUserId(
      parseInt(req.params.id, 10)
    );
    return this.ok(res, result);
  }

  async createComplaint(req, res, next) {
    req.body.userId = req.user.id;
    const date = new Date().toISOString();
    req.body.date = date;
    const result = await this.complaintService.createComplaint(req.body);
    return this.ok(res, result);
  }

  async getWeatherByComplaintId(req, res, next) {
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
