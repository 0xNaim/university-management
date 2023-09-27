import { z } from 'zod';

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Academic faculty title is required' }).trim(),
  }),
});

const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Academic faculty title is required' }).trim().optional(),
  }),
});

export const academicFacultyValidation = {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
};
