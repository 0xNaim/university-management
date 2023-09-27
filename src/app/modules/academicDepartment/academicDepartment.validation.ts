import { z } from 'zod';

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Department title is required',
      })
      .trim(),
    academicFaculty: z
      .string({
        required_error: 'Department faculty is required',
      })
      .trim(),
  }),
});

const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Department title is required' }).trim().optional(),
    academicFaculty: z.string({ required_error: 'Department faculty is required' }).trim().optional(),
  }),
});

export const academicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
};
