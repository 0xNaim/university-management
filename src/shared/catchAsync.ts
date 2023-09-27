import { NextFunction, Request, Response } from 'express';

/**
 * Wraps an asynchronous Express route handler to catch and handle any errors.
 *
 * @param {function} fn - The asynchronous route handler function to be wrapped.
 * @returns {function} A new function that handles errors and forwards them to the Express error handler.
 * @throws {Error} If an error occurs during the execution of the wrapped function.
 */
const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
