import express from 'express';

export class App {
  constructor(logger, userController, exeptionFilter) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  }

  useRoutes() {
    this.app.use('/users', this.userController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  async init() {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started at http://localhost:${this.port}`);
  }
}
