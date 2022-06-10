import { App } from './app.js';
import { ExeptionFilter } from './errors/exeption.filter.js';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/users.controller.js';
import { ComplaintController } from './complaints/complaint.controller.js';
import { RoleController } from './roles/role.controller.js';

async function bootstrap() {
  const logger = new LoggerService();
  const userController = new UserController(logger);
  const complaintController = new ComplaintController(logger);
  const roleController = new RoleController(logger);
  const exeptionFilter = new ExeptionFilter(logger);
  const app = new App(
    logger,
    userController,
    complaintController,
    roleController,
    exeptionFilter
  );
  await app.init();
}

bootstrap();
