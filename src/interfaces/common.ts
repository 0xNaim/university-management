import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericSendResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
  stack: string;
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

// User
export type IUserRoles = 'Student' | 'Faculty' | 'Admin';
export type IUserGender = 'Male' | 'Female';
export type IUserBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
