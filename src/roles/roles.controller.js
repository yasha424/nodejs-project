import { BaseController } from '../common/base.controller.js';
import {
  getSchema,
  createSchema,
  updateSchema,
  deleteSchema
} from './schemas/schemas.js';
import { RoleService } from './roles.service.js';
import { UserService } from '../users/users.service.js';
import { verifyJwt } from '../common/verify.jwt.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export class RoleController extends BaseController {
  constructor(logger, prismaService) {
    super(logger);
    this.roleService = new RoleService(prismaService);
    this.userService = new UserService(prismaService);

    this.bindRoutes([
      {
        path: '/:id',
        method: 'get',
        func: this.get,
        middlewares: [validationMiddleware(getSchema)]
      },
      {
        path: '/update/:id',
        method: 'put',
        func: this.updateRoleById,
        middlewares: [authMiddleware, validationMiddleware(updateSchema)]
      },
      {
        path: '/delete/:id',
        method: 'delete',
        func: this.deleteRoleById,
        middlewares: [authMiddleware, validationMiddleware(deleteSchema)]
      },
      {
        path: '/create',
        method: 'post',
        func: this.create,
        middlewares: [authMiddleware, validationMiddleware(createSchema)]
      }
    ]);
  }

  async get(req, res, next) {
    const result = await this.roleService.getRoleInfo(parseInt(req.params.id, 10));
    this.ok(res, result);
  }

  async updateRoleById(req, res, next) {
    const role = await this.roleService.getRoleInfo(req.user.roleId);
    if (role.name !== 'admin')
      return this.send(res, 403, 'You have no privelege to update role of this user');

    try {
      const result = await this.roleService.updateRole(
        parseInt(req.params.id, 10),
        req.body
      );
      return this.ok(res, result);
    } catch (err) {
      return this.send(res, 403, err);
    }
  }

  async deleteRoleById(req, res, next) {
    const role = await this.roleService.getRoleInfo(req.user.roleId);
    if (role.name !== 'admin')
      return this.send(res, 403, 'You have no privelege to delete roles');

    try {
      const result = await this.roleService.deleteRole(parseInt(req.params.id, 10));
      return this.ok(res, result);
    } catch (err) {
      return this.send(res, 403, err);
    }
  }

  async create(req, res, next) {
    const role = await this.roleService.getRoleInfo(req.user.roleId);
    if (role.name !== 'admin')
      return this.send(res, 403, 'You have no privelege to create roles');

    const result = await this.roleService.createRole(req.body);

    return this.ok(res, result);
  }
}
