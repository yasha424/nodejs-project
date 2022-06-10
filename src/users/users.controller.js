import { BaseController } from '../common/base.controller.js';

export class UserController extends BaseController {
  constructor(logger) {
    super(logger);
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login }
    ]);
  }

  delete(req, res, next) {
    this.ok(res, { id: Date.now() });
  }

  update(req, res, next) {
    this.ok(res, { id: Date.now(), name: 'Danil', username: 'Germanovich' });
  }

  login(req, res, next) {
    this.ok(res, { id: Date.now() });
  }

  register(req, res, next) {
    this.created(res, { id: Date.now() });
  }
}
