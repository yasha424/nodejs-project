import { BaseController } from '../common/base.controller.js';
import { getWeather } from '../services/weather.service.js';
import { validationMiddleware } from '../common/validation.middleware.js';
import {
  getSchema,
  createSchema,
  updateSchema,
  deleteSchema
} from './schemas/schemas.js';

export class ComplaintController extends BaseController {
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
        method: 'post',
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
        method: 'delete',
        func: this.delete,
        middlewares: [validationMiddleware(deleteSchema)]
      }
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

  async getAll(req, res, next) {
    const lat = 50.4460921;
    const lon = 30.4475845;
    try {
      const data = await getWeather(lat, lon);

      this.ok(res, [
        {
          id: Date.now(),
          latitude: lat,
          longitude: lon,
          temp: data.main.temp
        }
      ]);
    } catch (e) {
      this.ok(res, {
        id: Date.now(),
        latitude: lat,
        longitude: lon
      });
    }
  }

  create(req, res, next) {
    this.created(res, { id: Date.now() });
  }
}
