import { ErrorRequestHandler, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Error } from 'mongoose';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleCastError from '../../errors/handleCastError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { IGenericSendResponse } from '../../interfaces/common';
import { errorLogger } from '../../shared/logger';

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  const isDevelopment = config.env === 'development';
  const isValidationError = error instanceof Error.ValidationError;
  const isCastError = error instanceof Error.CastError;
  const isZodError = error instanceof ZodError;
  const isApiError = error instanceof ApiError;
  const isSyntaxOrTypeError = error instanceof SyntaxError || error instanceof TypeError;
  const isForbiddenError = error.code === 'EBADCSRFTOKEN';

  if (isDevelopment) {
    console.error('Error:', error);
  } else {
    errorLogger.error('Error:', error);
  }

  const response: IGenericSendResponse = {
    success: false,
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Bad request',
    errorMessages: [],
    stack: isDevelopment ? error.stack || '' : '',
  };

  if (isValidationError) {
    const simplifiedError = handleValidationError(error);
    response.statusCode = simplifiedError.statusCode;
    response.message = simplifiedError.message;
    response.errorMessages = simplifiedError.errorMessages;
  } else if (isCastError) {
    const simplifiedError = handleCastError(error);
    response.statusCode = simplifiedError.statusCode;
    response.message = simplifiedError.message;
    response.errorMessages = simplifiedError.errorMessages;
  } else if (isZodError) {
    const simplifiedError = handleZodError(error);
    response.statusCode = simplifiedError.statusCode;
    response.message = simplifiedError.message;
    response.errorMessages = simplifiedError.errorMessages;
  } else if (isApiError) {
    response.statusCode = error.statusCode;
    response.message = error.message;
    response.errorMessages = error.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  } else if (isForbiddenError) {
    response.statusCode = error.statusCode;
    response.message = 'Invalid csrf token';
    response.errorMessages = error.message
      ? [
          {
            path: '',
            message: 'Invalid csrf token',
          },
        ]
      : [];
  } else if (isSyntaxOrTypeError) {
    response.message = error.message;
    response.errorMessages = error.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  }

  res.status(response.statusCode).json(response);
};

const notFound: RequestHandler = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    statusCode: StatusCodes.NOT_FOUND,
    message: 'The requested path could not be found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'The requested path could not be found',
      },
    ],
    stack: '',
  });
};

export { errorHandler, notFound };
