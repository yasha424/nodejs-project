import { BaseController } from '../common/base.controller.js';
import { validationMiddleware } from '../common/validation.middleware.js';
import {
  getSchema,
  createSchema,
  updateSchema,
  deleteSchema
} from './schemas/schemas.js';
import { RoleService } from './roles.service.js';

export class RoleController extends BaseController {
  constructor(logger, prismaService) {
    super(logger);
    this.roleService = new RoleService(prismaService);
    this.bindRoutes([
      {
        path: '/:id',
        method: 'get',
        func: this.get,
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
      }
    ]);
  }

  async get(req, res, next) {
    const result = await this.roleService.getRoleInfo(parseInt(req.params.id, 10));
    this.ok(res, result);
  }

  async create(req, res, next) {
    const result = await this.roleService.createRole(req.body);
    this.ok(res, result);
  }

  async update(req, res, next) {
    const result = await this.roleService.updateRole(parseInt(req.params.id, 10), req.body);
    this.ok(res, result);
  }

  async delete(req, res, next) {
    const result = await this.roleService.deleteRole(parseInt(req.params.id, 10));
    this.ok(res, result);
  }
}
