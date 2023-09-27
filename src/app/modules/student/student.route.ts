import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequestMiddleware';
import { studentController } from './student.controller';
import { studentValidation } from './student.validation';
const router = Router();

router.get('/', studentController.getStudents);

router.get('/:id', studentController.getStudent);

router.patch('/:id', validateRequest(studentValidation.updateStudentZodSchema), studentController.updateStudent);

router.delete('/:id', studentController.deleteStudentAndUser);

export const studentRoutes = router;
