import { Error } from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';
import { StatusCodes } from 'http-status-codes';

const handleValidationError = (error: Error.ValidationError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object?.values(error?.errors || []).map(
    (el: Error.ValidatorError | Error.CastError) => {
      return {
        path: el?.path || '',
        message: el?.message,
      };
    },
  );

  const statusCode = StatusCodes.BAD_REQUEST;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
