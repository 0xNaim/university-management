import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
};

export const sendResponse = <T>(res: Response, { statusCode, success, message, meta, data }: IApiResponse<T>): void => {
  res.status(statusCode).json({ statusCode, success, message, data, meta });
};
