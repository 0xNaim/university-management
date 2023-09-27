import { StatusCodes } from 'http-status-codes';
import { Error } from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (error: Error.CastError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer',
    },
  ];

  const statusCode = StatusCodes.BAD_REQUEST;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
