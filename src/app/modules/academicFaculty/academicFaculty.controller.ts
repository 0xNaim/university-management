import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFilterFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pickKeys from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { IAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyService } from './academicFaculty.service';

// Create academic faculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const data = await academicFacultyService.createFaculty(req.body);

  if (!data) {
    return sendResponse<IAcademicFaculty>(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: true,
      message: 'Failed to create academic faculty',
      data: null,
    });
  }

  sendResponse<IAcademicFaculty>(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Academic faculty created successfully',
    data,
  });
});

// Get academic faculties
const getFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pickKeys(req.query, academicFacultyFilterableFields);
  const paginationOptions = pickKeys(req.query, paginationFilterFields);

  const { data, meta } = await academicFacultyService.getFaculties(filters, paginationOptions);

  if (!data?.length) {
    return sendResponse<IAcademicFaculty[]>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find any academic faculties",
      data: null,
    });
  }

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academics faculties information found',
    data,
    meta,
  });
});

// Get academic faculty
const getFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await academicFacultyService.getFaculty(id);

  if (!data) {
    return sendResponse<IAcademicFaculty | null>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find the academic faculty you are looking for",
      data: null,
    });
  }

  sendResponse<IAcademicFaculty | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic faculty information found',
    data,
  });
});

// Update academic faculty by it's ID
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await academicFacultyService.updateFaculty(id, req.body);

  if (!data) {
    return sendResponse<IAcademicFaculty | null>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find the academic faculty you want to update",
      data: null,
    });
  }

  sendResponse<IAcademicFaculty | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic faculty information updated successfully',
    data,
  });
});

// Delete academic faculty by it's ID
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await academicFacultyService.deleteFaculty(id);

  if (!data) {
    return sendResponse<IAcademicFaculty | null>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find the academic faculty you want to delete",
      data: null,
    });
  }

  sendResponse<IAcademicFaculty | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic faculty deleted successfully',
    data,
  });
});

export const academicFacultyController = {
  createFaculty,
  getFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
};
