import express from 'express';
import { json } from 'body-parser';

export class App {
  constructor(
    logger,
    userController,
    complaintController,
    roleController,
    exeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.complaintController = complaintController;
    this.roleController = roleController;
    this.exeptionFilter = exeptionFilter;
  }

  useMiddleware() {
    this.app.use(json());
  }

  useRoutes() {
    this.app.use('/users', this.userController.router);
    this.app.use('/complaints', this.complaintController.router);
    this.app.use('/roles', this.roleController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  async init() {
    this.useMiddleware();
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started at http://localhost:${this.port}`);
  }
}
