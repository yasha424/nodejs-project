import { BaseController } from '../common/base.controller.js';
import { validationMiddleware } from '../common/validation.middleware.js';
import {
  registerSchema,
  loginSchema,
  updateSchema,
  deleteSchema,
  userInfoSchema
} from './schemas/schemas.js';
import { UserService } from './users.service.js';

export class UserController extends BaseController {
  constructor(logger, prismaService) {
    super(logger);
    this.userService = new UserService(prismaService);
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
        middlewares: [validationMiddleware(deleteSchema)]
      },
      {
        path: '/update/:id',
        method: 'put',
        func: this.updateUser,
        middlewares: [validationMiddleware(updateSchema)]
      },
      {
        path: '/:id',
        method: 'get',
        func: this.getUser,
        middlewares: [validationMiddleware(userInfoSchema)]
      }
    ]);
  }

  async getUser(req, res, next) {
    const result = await this.userService.getUserInfo(parseInt(req.params.id, 10));
    this.ok(res, result);
  }

  async deleteUser(req, res, next) {
    const result = await this.userService.deleteUser(parseInt(req.params.id, 10));
    this.ok(res, result);
  }

  async updateUser(req, res, next) {
    const result = await this.userService.updateUser(
      parseInt(req.params.id, 10),
      req.body
    );
    this.ok(res, result);
  }

  async login(req, res, next) {
    const result = await this.userService.loginUser(req.body);
    this.ok(res, result);
  }

  async register(req, res, next) {
    const result = await this.userService.createUser(req.body);
    this.ok(res, result);
  }
}
