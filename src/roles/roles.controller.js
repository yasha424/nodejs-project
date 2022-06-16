import { BaseController } from '../common/base.controller.js';
import { validationMiddleware } from '../common/validation.middleware.js';
import {
  getSchema,
  createSchema,
  updateSchema,
  deleteSchema
} from './schemas/schemas.js';
import { RoleService } from './roles.service.js';
import { UserService } from '../users/users.service.js';
import { verifyJwt } from '../common/verify.jwt.js';

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
        func: this.update,
        middlewares: [validationMiddleware(updateSchema)]
      }
    ]);
  }

  async get(req, res, next) {
    const result = await this.roleService.getRoleInfo(parseInt(req.params.id, 10));
    this.ok(res, result);
  }

  async update(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return this.send(res, 401, 'Token required');

    try {
      req.user = verifyJwt(token);
    } catch (err) {
      return this.send(res, 403, err);
    }

    const role = await this.roleService.getRoleInfo(req.user.roleId);
    if (role.name !== 'admin')
      return this.send(res, 403, 'You have no privelege to update role of this user');

    const user = await this.userService.getUserInfo(parseInt(req.params.id, 10));
    if (user) {
      const result = await this.roleService.updateRole(user.roleId, req.body);
      return this.ok(res, result);
    }
    return this.send(res, 403, `No user with id ${req.params.id} found`);
  }
}
