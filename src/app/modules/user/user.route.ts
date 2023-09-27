import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequestMiddleware';
import { userController } from './user.controller';
import { userValidation } from './user.validation';
const router = Router();

router.post('/create-student', validateRequest(userValidation.createStudentZodSchema), userController.createStudent);

router.post('/create-faculty', validateRequest(userValidation.createFacultyZodSchema), userController.createFaculty);

export const userRoutes = router;
