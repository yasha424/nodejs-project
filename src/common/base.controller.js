import { Router } from 'express';

export class BaseController {
  constructor(logger) {
    this._router = Router();
    this.logger = logger;
  }

  get router() {
    return this._router;
  }

  send(res, code, message) {
    res.type('application/json');
    return res.status(code).json(message);
  }

  ok(res, message) {
    return this.send(res, 200, message);
  }

  created(res) {
    return res.sendStatus(201);
  }

  bindRoutes(routes) {
    routes.forEach((route) => {
      this.logger.log(`[${route.method}] ${route.path}`);
      const middleware = Array.isArray(route.middlewares)
        ? route.middlewares.map((m) => m.execute.bind(m))
        : [];
      const handler = route.func.bind(this);
      const pipeline = middleware ? [...middleware, handler] : handler;
      this.router[route.method](route.path, pipeline);
    });
  }
}
