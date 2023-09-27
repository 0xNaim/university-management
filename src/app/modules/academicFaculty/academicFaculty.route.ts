import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequestMiddleware';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = Router();

router.post(
  '/create-faculty',
  validateRequest(academicFacultyValidation.createAcademicFacultyZodSchema),
  academicFacultyController.createFaculty,
);

router.get('/', academicFacultyController.getFaculties);

router.get('/:id', academicFacultyController.getFaculty);

router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.updateAcademicFacultyZodSchema),
  academicFacultyController.updateFaculty,
);

router.delete('/:id', academicFacultyController.deleteFaculty);

export const academicFacultyRoutes = router;
