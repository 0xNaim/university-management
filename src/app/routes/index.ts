import { Router } from 'express';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { studentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
