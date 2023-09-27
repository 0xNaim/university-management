import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFilterFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pickKeys from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterService } from './academicSemester.service';

// Create semester
const createSemester = catchAsync(async (req: Request, res: Response) => {
  const data = await academicSemesterService.createSemester(req.body);

  if (!data) {
    return sendResponse<IAcademicSemester>(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: true,
      message: 'Failed to create semester',
      data: null,
    });
  }

  sendResponse<IAcademicSemester>(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Semester created successfully',
    data,
  });
});

// Get all semesters with optional filtering and pagination
const getSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pickKeys(req.query, academicSemesterFilterableFields);
  const paginationOptions = pickKeys(req.query, paginationFilterFields);

  const { meta, data } = await academicSemesterService.getSemesters(filters, paginationOptions);

  if (!data?.length) {
    return sendResponse<IAcademicSemester[]>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find any semesters",
      data: null,
    });
  }

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semesters information found',
    data,
    meta,
  });
});

// Get semester by it's ID
const getSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await academicSemesterService.getSemester(id);

  if (!data) {
    return sendResponse<IAcademicSemester | null>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find the semester you are looking for",
      data: null,
    });
  }

  sendResponse<IAcademicSemester | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester information found',
    data,
  });
});

// Update semester by it's ID
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await academicSemesterService.updateSemester(id, req.body);

  if (!data) {
    return sendResponse<IAcademicSemester | null>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find the semester you want to update",
      data: null,
    });
  }

  sendResponse<IAcademicSemester | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester information updated successfully',
    data,
  });
});

// Delete semester by it's ID
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await academicSemesterService.deleteSemester(id);

  if (!data) {
    return sendResponse<IAcademicSemester | null>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find the semester you want to delete",
      data: null,
    });
  }

  sendResponse<IAcademicSemester | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester deleted successfully',
    data,
  });
});

export const academicSemesterController = {
  createSemester,
  getSemesters,
  getSemester,
  updateSemester,
  deleteSemester,
};
