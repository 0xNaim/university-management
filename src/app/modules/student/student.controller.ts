import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFilterFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pickKeys from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import { studentService } from './student.service';

// Gel all students
const getStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pickKeys(req.query, studentFilterableFields);
  const paginationOptions = pickKeys(req.query, paginationFilterFields);

  const { data, meta } = await studentService.getStudents(filters, paginationOptions);

  if (!data?.length) {
    return sendResponse<IStudent[]>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find any students",
      data: null,
    });
  }

  sendResponse<IStudent[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Students information found',
    data,
    meta,
  });
});

// Get student by it's ID
const getStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await studentService.getStudent(id);

  if (!data) {
    return sendResponse<IStudent | null>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find the student you are looking for",
      data: null,
    });
  }

  sendResponse<IStudent | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student information found',
    data,
  });
});

// Update student by it's ID
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await studentService.updateStudent(id, req.body);

  if (!data) {
    return sendResponse<IStudent | null>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find the student you want to update",
      data: null,
    });
  }

  sendResponse<IStudent | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student information updated successfully',
    data,
  });
});

// Delete student and user
const deleteStudentAndUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await studentService.deleteStudentAndUser(id);

  if (!data) {
    return sendResponse<IStudent | null>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find the student you want to delete",
      data: null,
    });
  }

  sendResponse<IStudent | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student deleted successfully',
    data,
  });
});

export const studentController = {
  getStudents,
  getStudent,
  updateStudent,
  deleteStudentAndUser,
};
