import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequestMiddleware';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = Router();

router.post(
  '/create-department',
  validateRequest(academicDepartmentValidation.createAcademicDepartmentZodSchema),
  academicDepartmentController.createDepartment,
);

router.get('/', academicDepartmentController.getDepartments);

router.get('/:id', academicDepartmentController.getDepartment);

router.patch(
  '/:id',
  validateRequest(academicDepartmentValidation.updateAcademicDepartmentZodSchema),
  academicDepartmentController.updateDepartment,
);

router.delete('/:id', academicDepartmentController.deleteDepartment);

export const academicDepartmentRoutes = router;
