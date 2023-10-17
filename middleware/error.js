import Logger from '../middleware/logger.js';

export class CustomedError extends Error {
  constructor(name) {
    super(name);
  }
}

export class FatalError extends CustomedError {
  constructor(protocol) {
    super('Fatal Injection Error');
    this.code = 500;
    new Logger('fatal', this);
  }
}

export class InvalidInputError extends CustomedError {
  constructor(protocol) {
    super('Invalid Input Error');
    this.code = 400;
    new Logger('error', this);
  }
}

export class InvalidRequestError extends CustomedError {
  constructor(protocol) {
    super('Invalid Request Error');
    this.code = 401;
    new Logger('warn', this);
  }
}

export class InfoLog extends CustomedError {
  constructor(protocol) {
    super('INFO LOG');
    this.code = 200;
    new Logger('info', this);
  }
}
