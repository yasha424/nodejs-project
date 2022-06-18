import { BaseController } from '../common/base.controller.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import {
  registerSchema,
  loginSchema,
  updateSchema,
  deleteSchema,
  userInfoSchema
} from './schemas/schemas.js';
import { UserService } from './users.service.js';
import { RoleService } from '../roles/roles.service.js';
import { ComplaintService } from '../complaints/complaints.service.js';
import { HTTPError } from '../errors/http-error.class.js';
import { verifyJwt, signJwt } from '../common/verify.jwt.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export class UserController extends BaseController {
  constructor(logger, prismaService) {
    super(logger);
    this.userService = new UserService(prismaService);
    this.roleService = new RoleService(prismaService);
    this.complaintService = new ComplaintService(prismaService);
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middlewares: [validationMiddleware(registerSchema)]
      },

      {
        path: '/login',
        method: 'post',
        func: this.login,
        middlewares: [validationMiddleware(loginSchema)]
      },
      {
        path: '/delete/:id',
        method: 'delete',
        func: this.deleteUser,
        middlewares: [authMiddleware, validationMiddleware(deleteSchema)]
      },
      {
        path: '/update',
        method: 'put',
        func: this.updateUser,
        middlewares: [authMiddleware, validationMiddleware(updateSchema)]
      },
      {
        path: '/update/:id',
        method: 'put',
        func: this.updateUserById,
        middlewares: [authMiddleware, validationMiddleware(updateSchema)]
      }
    ]);
  }

  async deleteUser(req, res, next) {
    const role = await this.roleService.getRoleInfo(req.user.roleId);
    if (role.name !== 'admin')
      return this.send(res, 403, 'You have no privelege to delete this user');

    await this.complaintService.deleteComplaintsByUserId(parseInt(req.params.id, 10));

    const result = await this.userService.deleteUser(parseInt(req.params.id, 10));
    if (!result.id) {
      return res.send(res, 403, `No user with id ${req.params.id} found`);
    }
    return this.ok(res, result);
  }

  async updateUser(req, res, next) {
    const result = await this.userService.updateUser(parseInt(req.user.id, 10), req.body);
    const newToken = signJwt(result);
    return this.ok(res, { accessToken: newToken });
  }

  async login(req, res, next) {
    const result = await this.userService.loginUser(req.body);
    if (!result) return this.send(res, 403, 'Email or password is incorrect');

    const token = signJwt(result);
    return this.ok(res, { accessToken: token });
  }

  async register(req, res, next) {
    const result = await this.userService.createUser(req.body);
    req.body.roleId = 2;

    if (!result)
      return this.send(res, 409, `User with email: ${req.body.email} already exists`);

    try {
      const token = signJwt(result, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30m'
      });
      return this.ok(res, { accessToken: token });
    } catch (err) {
      return this.send(res, 403, err);
    }
  }

  async updateUserById(req, res, next) {
    const role = await this.roleService.getRoleInfo(req.user.roleId);
    if (role.name !== 'admin')
      return this.send(res, 403, 'You have no privelege to change password of this user');

    try {
      const result = await this.userService.updateUser(
        parseInt(req.params.id, 10),
        req.body
      );
      return this.ok(res, result);
    } catch (err) {
      return this.send(res, 403, err);
    }
  }
}
