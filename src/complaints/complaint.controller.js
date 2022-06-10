import { BaseController } from '../common/base.controller.js';

export class ComplaintController extends BaseController {
  constructor(logger) {
    super(logger);
    this.bindRoutes([
      { path: '/', method: 'get', func: this.getAll },
      { path: '/create', method: 'post', func: this.create },
      { path: '/update', method: 'put', func: this.update }
    ]);
  }

  delete(req, res, next) {
    this.ok(res, { id: Date.now() });
  }

  update(req, res, next) {
    this.ok(res, {
      id: Date.now(),
      latitude: 50.4460971,
      longitude: 30.4475845
    });
  }

  getAll(req, res, next) {
    this.ok(res, {
      id: Date.now(),
      latitude: 50.4460921,
      longitude: 30.4475845
    });
  }

  create(req, res, next) {
    this.created(res, { id: Date.now() });
  }
}
