import { BaseController } from '../common/base.controller.js';
import { validationMiddleware } from '../common/validation.middleware.js';
import {
  getSchema,
  createSchema,
  updateSchema,
  deleteSchema
} from './schemas/schemas.js';

export class RoleController extends BaseController {
  constructor(logger) {
    super(logger);
    this.bindRoutes([
      {
        path: '/',
        method: 'get',
        func: this.getAll,
        middlewares: [validationMiddleware(getSchema)]
      },
      {
        path: '/create',
        method: 'put',
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
        method: 'put',
        func: this.delete,
        middlewares: [validationMiddleware(deleteSchema)]
      }
    ]);
  }

  getAll(req, res, next) {
    this.ok(res, [
      { id: Date.now(), name: 'admin' },
      { id: Date.now() + 10, name: 'user' }
    ]);
  }

  create(req, res, next) {
    this.ok(res, { id: Date.now() });
  }

  update(req, res, next) {
    this.ok(res, { id: Date.now() });
  }

  delete(req, res, next) {
    this.ok(res, { id: Date.now() });
  }
}
