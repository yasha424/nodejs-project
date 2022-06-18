import { Logger } from 'tslog';
import { appendFileSync } from 'fs';

function logToTransport(logObject) {
  appendFileSync('./.log', `${JSON.stringify(logObject)}\n`);
}

export class LoggerService {
  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFilePath: 'hidden',
      displayFunctionName: false
    });

    this.logger.attachTransport(
      {
        silly: logToTransport,
        debug: logToTransport,
        trace: logToTransport,
        info: logToTransport,
        warn: logToTransport,
        error: logToTransport,
        fatal: logToTransport
      },
      'debug'
    );
  }

  log(...args) {
    this.logger.info(...args);
  }

  error(...args) {
    this.logger.error(...args);
  }

  warn(...args) {
    this.logger.warn(...args);
  }
}
