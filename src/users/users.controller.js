import { BaseController } from '../common/base.controller.js';
import { validationMiddleware } from '../common/validation.middleware.js';
import {
  registerSchema,
  loginSchema,
  updateSchema,
  deleteSchema
} from './schemas/schemas.js';

export class UserController extends BaseController {
  constructor(logger) {
    super(logger);
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
        func: this.delete,
        middlewares: [validationMiddleware(deleteSchema)]
      },
      {
        path: '/update/:id',
        method: 'put',
        func: this.update,
        middlewares: [validationMiddleware(updateSchema)]
      }
    ]);
  }

  delete(req, res, next) {
    this.ok(res, { id: Date.now() });
  }

  update(req, res, next) {
    this.ok(res, { id: Date.now(), name: 'Danil' });
  }

  login(req, res, next) {
    this.ok(res, { id: Date.now() });
  }

  register(req, res, next) {
    this.ok(res, { id: Date.now(), name: 'Danil', username: 'Germanovich' });
  }
}
