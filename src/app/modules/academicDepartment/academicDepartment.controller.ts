import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFilterFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pickKeys from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interface';
import { academicDepartmentService } from './academicDepartment.service';

// Create academic department
const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const data = await academicDepartmentService.createDepartment(req.body);

  if (!data) {
    return sendResponse<IAcademicDepartment | null>(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: true,
      message: 'Failed to create department',
      data: null,
    });
  }

  sendResponse<IAcademicDepartment | null>(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Department created successfully',
    data,
  });
});

// Get academic departments
const getDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pickKeys(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pickKeys(req.query, paginationFilterFields);

  const { data, meta } = await academicDepartmentService.getDepartments(filters, paginationOptions);

  if (!data?.length) {
    return sendResponse<IAcademicDepartment[]>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find any academic departments",
      data: null,
    });
  }

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academics departments information found',
    data,
    meta,
  });
});

// Get academic department by it's ID
const getDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await academicDepartmentService.getDepartment(id);

  if (!data) {
    return sendResponse<IAcademicDepartment | null>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find the department you are looking for",
      data: null,
    });
  }

  sendResponse<IAcademicDepartment | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Department information found',
    data,
  });
});

// Update academic department by it's ID
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await academicDepartmentService.updateDepartment(id, req.body);

  if (!data) {
    return sendResponse<IAcademicDepartment | null>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find the academic department you want to update",
      data: null,
    });
  }

  sendResponse<IAcademicDepartment | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic department information updated successfully',
    data,
  });
});

// Delete academic department by it's ID
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await academicDepartmentService.deleteDepartment(id);

  if (!data) {
    return sendResponse<IAcademicDepartment | null>(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "We couldn't find the department you want to delete",
      data: null,
    });
  }

  sendResponse<IAcademicDepartment | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Department deleted successfully',
    data,
  });
});

export const academicDepartmentController = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
