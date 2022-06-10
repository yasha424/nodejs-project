import { BaseController } from '../common/base.controller.js';

export class RoleController extends BaseController {
  constructor(logger) {
    super(logger);
    this.bindRoutes([
      { path: '/', method: 'get', func: this.getAll },
      { path: '/create', method: 'put', func: this.create }
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
