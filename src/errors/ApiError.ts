import config from '../config';

class ApiError extends Error {
  readonly statusCode: number;

  constructor(statusCode: number, message: string, stack: string = '') {
    super(message);

    this.name = 'ApiError';
    this.statusCode = statusCode;

    // Limit stack trace inclusion to development environment
    if (stack && config.env === 'development') {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

export default ApiError;
