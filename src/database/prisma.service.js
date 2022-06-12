import prisma from '@prisma/client';

export class PrismaService {
  constructor(logger) {
    this.logger = logger;
    this.client = new prisma.PrismaClient();
  }

  async connect() {
    try {
      await this.client.$connect();
      this.logger.log('[PrismaService] Successfully connected to the database');
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(`[PrismaService] Error connecting to database: ${+e.message}`);
      }
    }
  }

  async disconnect() {
    await this.client.$disconnect();
  }
}
