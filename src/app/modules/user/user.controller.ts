import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { userService } from './user.service';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const data = await userService.createStudent(student, userData);

  if (!data) {
    return sendResponse<IUser>(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Failed to create student',
      data: null,
    });
  }

  sendResponse<IUser>(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Student created successfully',
    data: data as IUser,
  });
});

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;
  const data = await userService.createFaculty(faculty, userData);

  if (!data) {
    return sendResponse<IUser>(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Failed to create faculty',
      data: null,
    });
  }

  sendResponse<IUser>(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Faculty created successfully',
    data: data as IUser,
  });
});

export const userController = {
  createStudent,
  createFaculty,
};
