import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequestMiddleware';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = Router();

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.createSemester,
);

router.get('/', academicSemesterController.getSemesters);

router.get('/:id', academicSemesterController.getSemester);

router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema),
  academicSemesterController.updateSemester,
);

router.delete('/:id', academicSemesterController.deleteSemester);

export const academicSemesterRoutes = router;
